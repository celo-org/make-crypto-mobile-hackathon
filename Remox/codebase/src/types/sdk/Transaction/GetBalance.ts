export interface GetBalanceResponse {
	celoBalance: string;
	cUSDBalance: string;
	cEURBalance: string;
	UBE: string;
	MOO: string;
	MOBI: string;
	POOF: string;
}

export enum GetBalanceResponseEnum {
	celoBalance = "celoBalance",
	cUSDBalance = "cUSDBalance",
	cEURBalance = "cEURBalance",
	UBE = "UBE",
	MOO = "MOO",
	MOBI = "MOBI",
	POOF = "POOF",
}
