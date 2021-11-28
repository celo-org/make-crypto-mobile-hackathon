import {PriceDataType, PriceFeedConnector, SignedPriceDataType} from "../PriceFeedConnector";
import axios from "axios";
import _ from "lodash";
import EvmPriceSigner from "redstone-node/dist/src/signers/EvmPriceSigner";

export type RedStoneProvider = "redstone" | "redstone-stocks" | "redstone-rapid";

export class RedStonePriceFeed implements PriceFeedConnector {

  private readonly priceSigner = new EvmPriceSigner();
  private readonly apiUrl: string;
  private cachedSigner?: string;

  constructor(
    private providerId: RedStoneProvider,
    private asset?: string) {

    this.apiUrl = `https://api.redstone.finance/packages/latest?provider=${providerId}`
      + (asset ? `&symbol=${asset}` : '');
    
  }

  async getSignedPrice(): Promise<SignedPriceDataType> {
    const response = await axios.get(this.apiUrl);

    const pricePackage = _.pick(response.data, ["prices", "timestamp"]);
    const serialized = this.priceSigner.serializeToMessage(pricePackage);

    // TODO: change return type of the priceSigner.serializeToMessage?
    // in the end, we're using TYPEScript here ;-)
    const priceData: PriceDataType = serialized as PriceDataType;

    return {
      priceData,
      ..._.pick(response.data, ["signer", "signature", "liteSignature"]),
    };
  }

  async getSigner(): Promise<string> {
      if (!this.cachedSigner) {
          const response = await axios.get("https://api.redstone.finance/providers");
          this.cachedSigner = response.data[this.providerId].evmAddress;
      }
      return this.cachedSigner as string;
  }

}
