import {ContractWrapper} from "../ContractWrapper";
import {Contract, ethers, Signer} from "ethers";
import {PriceFeedConnector} from "../connector/PriceFeedConnector";
import {PriceFeedWithClearing__factory} from "../../../typechain";

export class EthersContractWrapper<T extends Contract> implements ContractWrapper<T> {

  constructor(
    protected readonly baseContract: T,
    protected readonly apiConnector: PriceFeedConnector) {
  }

  finish(): T {
    const contract = this.baseContract;
    const contractPrototype = Object.getPrototypeOf(contract);
    const wrappedContract = Object.assign(
      Object.create(contractPrototype),
      contract);
    const self = this;

    const functionNames: string[] = Object.keys(contract.functions);
    functionNames.forEach(functionName => {
      if (functionName.indexOf("(") == -1) {
        const isCall = contract.interface.getFunction(functionName).constant;
        if (functionName == "authorizeSigner") {
            (wrappedContract["authorizeProvider"] as any) = async function () {
            const signer = await self.getSigner();
            console.log("Authorizing provider: " + signer);
            return await wrappedContract.authorizeSigner(signer);
          }
        } else {
          (wrappedContract[functionName] as any) = async function (...args: any[]) {

            const tx = await contract.populateTransaction[functionName](...args);

          // Here we append price data (currently with function signatures) to transaction data
          tx.data = tx.data
            + (await self.getPriceData(contract.signer))
            + self.getMarkerData();

            if (isCall) {
              const result = await contract.signer.call(tx);
              const decoded = contract.interface.decodeFunctionResult(functionName, result);
              return decoded.length == 1 ? decoded[0] : decoded;
            } else {
              return await contract.signer.sendTransaction(tx);
            }
          };
        }
      }
    });

    return wrappedContract;
  }
  
  protected getSigner(): Promise<string> {
    return this.apiConnector.getSigner();
  }

  protected getMarkerData(): string {
    const marker = ethers.utils.id("Redstone.version.0.0.1");
    return EthersContractWrapper.remove0xFromHexString(marker);
  }

  protected async getPriceData(signer: Signer): Promise<string> {
    const {priceData, signature} = await this.apiConnector.getSignedPrice();

    const priceFeed = PriceFeedWithClearing__factory.connect(ethers.constants.AddressZero, signer);
    const setPriceTx = await priceFeed.populateTransaction.setPrices(priceData, signature);

    // not sure about this?
    if (setPriceTx.data === undefined) {
      throw new Error("setPriceTx data not set");
    }
    const setPriceData = EthersContractWrapper.remove0xFromHexString(setPriceTx.data);

    // priceData may have any value, we don't use it
    const clearPriceTx = await priceFeed.populateTransaction.clearPrices(priceData);

    // TODO: what if clearPriceTx.data is undefined? throw an error?
    // We skip two first characters ("0x") and get 8 next (4 bytes of signature encoded as HEX)
    const clearPricePrefix = clearPriceTx.data ? clearPriceTx.data.substr(2, 8) : "";

    // Add priceDataLen info
    const priceDataLen = EthersContractWrapper.countBytesInHexString(setPriceData);

    // Template of data that we add to the end of tx is below
    // [SIG_CLEAR|4][SIG_SET|4][DATA|...][DATA_LEN|2][MARKER|32]
    // - SIG_CLEAR (4 bytes) - signature of clearPrices method of PriceFeed contract
    // - SIG_SET (4 bytes) - signature of setPrices method of PriceFeed contract

    // TODO: shouldn't the DATA_LEN be before DATA?
    // - DATA (variable bytes size) - pricing data
    // - DATA_LEN (2 bytes) - pricing data size (in bytes)
    // - MARKER (32 bytes) - redstone marker
    return clearPricePrefix + setPriceData + priceDataLen.toString(16).padStart(4, "0"); // padStart helps to always have 2 bytes length for any number
  }

  private static countBytesInHexString(hexStringWithout0x: string): number {
    return hexStringWithout0x.length / 2;
  }

  private static remove0xFromHexString(hexString: string): string {
    if (!hexString?.toLowerCase().startsWith("0x")) {
      return hexString;
    }

    return hexString.substr(2);
  }

}
