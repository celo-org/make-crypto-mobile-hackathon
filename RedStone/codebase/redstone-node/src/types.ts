import { JWKInterface } from "arweave/node/lib/wallet";

export interface Manifest {
  txId?: string; // note: this fiels is set by smart contract while downloading active manifest content
  interval: number;
  priceAggregator: string;
  defaultSource?: string[];
  sourceTimeout: number;
  maxPriceDeviationPercent: number,
  evmChainId: number,
  tokens: { [symbol: string]: TokenConfig };
};

export interface SourceTimeout {
  default: number;
  source: { [symbol: string]: number };
};

export interface Credentials {
  infuraProjectId?: string;
  ethereumPrivateKey: string;
  barchartApiKey?: string;
  barchartUsername?: string;
  barchartPassword?: string;
  yahooFinanceRapidApiKey?: string;
};

export interface TokenConfig {
  source?: string[];
  maxPriceDeviationPercent?: number;
};

export interface FetcherOpts {
  credentials: Credentials;
};

export interface Fetcher {
  fetchAll: (
    tokens: string[],
    opts?: FetcherOpts) => Promise<PriceDataFetched[]>;
};

export interface Aggregator {
  getAggregatedValue:
    (price: PriceDataBeforeAggregation, maxPriceDeviationPercent: number) => PriceDataAfterAggregation;
};

export interface Broadcaster {
  broadcast: (prices: PriceDataSigned[]) => Promise<void>;
  broadcastPricePackage: (
    pricePackage: SignedPricePackage,
    providerAddress: string) => Promise<void>;
};

export interface PricesObj {
  [symbol: string]: number;
};

export interface PriceDataFetched {
  symbol: string;
  value: any; // usually it is a positive number, but it may also be 0, null, undefined or "error"
};

export interface PriceDataBeforeAggregation {
  id: string;
  symbol: string;
  source: { [sourceName: string]: any };
  timestamp: number;
  version: string;
};

export interface PriceDataAfterAggregation extends PriceDataBeforeAggregation {
  value: number;
};

export interface PriceDataBeforeSigning extends PriceDataAfterAggregation {
  permawebTx: string;
  provider: string;
};

export interface PriceDataSigned extends PriceDataBeforeSigning {
  signature: string;
  evmSignature?: string;
  liteEvmSignature?: string;
};

export interface ShortSinglePrice {
  symbol: string;
  value: any;
};

export interface PricePackage {
  prices: ShortSinglePrice[];
  timestamp: number;
};

export interface SignedPricePackage {
  pricePackage: PricePackage;
  signer: string;
  signature: string;
  liteSignature: string;
};

export interface SerializedPriceData {
  symbols: string[];
  values: any[];
  timestamp: number;
};

export interface ArweaveTransactionTags {
  [tag: string]: string,
};

export interface NodeConfig {
  arweaveKeysFile?: string;
  arweaveKeysJWK?: JWKInterface; // it must be specified when we pass config through an env variable
  useManifestFromSmartContract?: boolean;
  addEvmSignature?: boolean;
  manifestFile: string;
  minimumArBalance: number;
  credentials: Credentials;
  httpBroadcasterURLs?: string[];
};
