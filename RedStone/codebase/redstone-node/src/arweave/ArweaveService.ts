import {Consola} from "consola";
import {
  ArweaveTransactionTags,
  Manifest,
  PriceDataAfterAggregation,
  PriceDataBeforeSigning,
  PriceDataSigned,
} from "../types";
import ArweaveProxy from "./ArweaveProxy";
import {trackEnd, trackStart} from "../utils/performance-tracker";
import Transaction from "arweave/node/lib/transaction";

const logger = require("../utils/logger")("ArweaveService") as Consola;
const deepSortObject = require("deep-sort-object");

export type BalanceCheckResult = { balance: number, isBalanceLow: boolean }

// Business service that supplies operations required by Redstone-Node.
export default class ArweaveService {

  private static readonly CONTRACT_REGISTRY_TX_ID: string = "XQkGzXG6YknJyy-YbakEZvQKAWkW2_aPRhc3ShC8lyA";
  private static readonly PROVIDERS_REGISTRY_CONTRACT: string = "providers-registry";

  constructor(
    private readonly arweaveProxy: ArweaveProxy,
    private readonly minBalance: number
  ) {
  }

  async prepareArweaveTransaction(prices: PriceDataAfterAggregation[], nodeVersion: string)
    : Promise<Transaction> {
    const transactionPreparingTrackingId = trackStart("transaction-preparing");

    logger.info("Keeping prices on arweave blockchain - preparing transaction");
    this.checkAllPricesHaveSameTimestamp(prices);

    const tags = this.prepareTransactionTags(nodeVersion, prices);

    const transaction = await this.arweaveProxy.prepareUploadTransaction(tags, prices);
    trackEnd(transactionPreparingTrackingId);

    return transaction;
  }

  async checkBalance(): Promise<BalanceCheckResult> {
    try {
      const balance = await this.arweaveProxy.getBalance();
      const isBalanceLow = balance < this.minBalance;
      logger.info(`Balance: ${balance}`);
      return {balance, isBalanceLow};
    } catch (e) {
      logger.error("Error while checking balance on Arweave", e.stack);
      return {balance: 0, isBalanceLow: true};
    }

  }

  async storePricesOnArweave(arTransaction: Transaction) {
    logger.info(
      `Keeping prices on arweave blockchain - posting transaction
       ${arTransaction.id}`);
    const keepingTrackingId = trackStart("keeping");
    //TODO: Handle errors in a more sensible way ;-) https://app.clickup.com/t/k38r91
    try {
      await this.arweaveProxy.postTransaction(arTransaction);
      logger.info(`Transaction posted: ${arTransaction.id}`);
    } catch (e) {
      logger.error("Error while storing prices on Arweave", e.stack);
    } finally {
      trackEnd(keepingTrackingId);
    }
  }

  async getCurrentManifest(): Promise<Manifest> {
    const jwkAddress = await this.arweaveProxy.getAddress();

    // Getting contract tx id for providers registry contract
    const contractRegistryContract = this.arweaveProxy.smartweave
      .contract(ArweaveService.CONTRACT_REGISTRY_TX_ID)
      .connect(this.arweaveProxy.jwk);

    const { result: contractRegistry } = await contractRegistryContract.viewState<any, any>({
      function: "contractsCurrentTxId",
      data: {
        contractNames: [ArweaveService.PROVIDERS_REGISTRY_CONTRACT]
      }
    });

    const providersRegistryContractTxId = contractRegistry[ArweaveService.PROVIDERS_REGISTRY_CONTRACT];

    // Getting the latest manifest for current provider
    const providersRegistryContract = this.arweaveProxy.smartweave
      .contract(providersRegistryContractTxId)
      .connect(this.arweaveProxy.jwk);

    const { result } = await providersRegistryContract.viewState<any, any>({
      function: "activeManifest",
      data: {
        providerId: jwkAddress,
        eagerManifestLoad: true
      }
    });

    return result.manifest.activeManifestContent;
  }

  async signPrice(price: PriceDataBeforeSigning): Promise<PriceDataSigned> {
    const priceWithSortedProps = deepSortObject(price);
    const priceStringified = JSON.stringify(priceWithSortedProps);
    const signature = await this.arweaveProxy.sign(priceStringified);

    return {
      ...price,
      signature,
    };
  }

  private checkAllPricesHaveSameTimestamp(prices: PriceDataAfterAggregation[]) {
    if (!prices || prices.length === 0) {
      throw new Error("Can not keep empty array of prices in Arweave");
    }

    const differentTimestamps = new Set(prices.map(price => price.timestamp));
    if (differentTimestamps.size !== 1) {
      throw new Error(`All prices should have same timestamps.
     Found ${differentTimestamps.size} different timestamps.`);
    }
  }

  private prepareTransactionTags(nodeVersion: string, prices: PriceDataAfterAggregation[]) {
    const tags: ArweaveTransactionTags = {
      app: "Redstone",
      type: "data",
      version: nodeVersion,

      // Tags for HTTP headers
      "Content-Type": "application/json",
      "Content-Encoding": "gzip",

      // All prices have the same timestamp
      timestamp: String(prices[0].timestamp),
    };

    // Adding AR price to tags if possible
    const arPrice = prices.find(p => p.symbol === "AR");
    if (arPrice !== undefined) {
      tags["AR"] = String(arPrice.value);
    }
    return tags;
  }
}
