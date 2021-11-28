import { PriceDataSigned, SignedPricePackage } from "../types";

export interface Broadcaster {

  broadcast(prices: PriceDataSigned[]): Promise<void>;

  broadcastPricePackage(
    signedData: SignedPricePackage,
    providerAddress: string): Promise<void>;
};
