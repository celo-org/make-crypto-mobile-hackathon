import { GetBalanceResponseEnum } from './sdk';

export enum CoinsURL {
	CELO = '/icons/celoiconsquare.svg',
	cUSD = '/icons/celodollar.svg',
	cEUR = '/icons/ceur.png',
	UBE = '/icons/ubeswap.png',
	MOO = '/icons/moola.png',
	MOBI = '/icons/mobius.png',
	POOF = '/icons/poof.png',
	None = ''
}

export enum CoinsName {
	CELO = 'celo',
	cUSD = 'cUSD',
	cEUR = 'cEUR',
	UBE = 'UBE',
	MOO = 'MOO',
	MOBI = 'MOBI',
	POOF = 'POOF'
}

export enum CoinsNameVisual {
	CELO = 'CELO',
	cUSD = 'cUSD',
	cEUR = 'cEUR',
	UBE = 'UBE',
	MOO = 'MOO',
	MOBI = 'MOBI',
	POOF = 'POOF'
}

export enum TransactionFeeTokenName {
	CELO = 'celo',
	cUSD = 'cUSD',
	cEUR = 'cEUR',
	UBE = 'UBE',
	MOO = 'MOO',
	MOBI = 'MOBI',
	POOF = 'POOF'
}

export enum StableTokens {
	cUSD = 'cUSD',
	cEUR = 'cEUR'
}

export enum AltcoinsList {
	UBE = 'UBE',
	MOO = 'MOO',
	MOBI = 'MOBI',
	POOF = 'POOF'
}

export enum CoinsNameLower {
	CELO = 'celo',
	cUSD = 'cUsd',
	cEUR = 'cEur',
	UBE = 'UBE',
	MOO = 'MOO',
	MOBI = 'MOBI',
	POOF = 'POOF'
}

export enum CoinsResponse {}

export const Coins: Coins = {
	celo: {
		name: CoinsNameVisual.CELO,
		coinUrl: CoinsURL.CELO,
		value: CoinsName.CELO,
		feeName: TransactionFeeTokenName.CELO,
		lowerName: CoinsNameLower.CELO,
		responseName: GetBalanceResponseEnum.celoBalance
	},
	cUSD: {
		name: CoinsNameVisual.cUSD,
		coinUrl: CoinsURL.cUSD,
		value: CoinsName.cUSD,
		feeName: TransactionFeeTokenName.cUSD,
		lowerName: CoinsNameLower.cUSD,
		responseName: GetBalanceResponseEnum.cUSDBalance
	},
	cEUR: {
		name: CoinsNameVisual.cEUR,
		coinUrl: CoinsURL.cEUR,
		value: CoinsName.cEUR,
		feeName: TransactionFeeTokenName.cEUR,
		lowerName: CoinsNameLower.cEUR,
		responseName: GetBalanceResponseEnum.cEURBalance
	},
	UBE: {
		name: CoinsNameVisual.UBE,
		coinUrl: CoinsURL.UBE,
		value: CoinsName.UBE,
		feeName: TransactionFeeTokenName.UBE,
		lowerName: CoinsNameLower.UBE,
		responseName: GetBalanceResponseEnum.UBE
	},
	MOO: {
		name: CoinsNameVisual.MOO,
		coinUrl: CoinsURL.MOO,
		value: CoinsName.MOO,
		feeName: TransactionFeeTokenName.MOO,
		lowerName: CoinsNameLower.MOO,
		responseName: GetBalanceResponseEnum.MOO
	},
	MOBI: {
		name: CoinsNameVisual.MOBI,
		coinUrl: CoinsURL.MOBI,
		value: CoinsName.MOBI,
		feeName: TransactionFeeTokenName.MOBI,
		lowerName: CoinsNameLower.MOBI,
		responseName: GetBalanceResponseEnum.MOBI
	},
	POOF: {
		name: CoinsNameVisual.POOF,
		coinUrl: CoinsURL.POOF,
		value: CoinsName.POOF,
		feeName: TransactionFeeTokenName.POOF,
		lowerName: CoinsNameLower.POOF,
		responseName: GetBalanceResponseEnum.POOF
	}
};

export interface Coins {
	celo: AltCoins;
	cUSD: AltCoins;
	cEUR: AltCoins;
	UBE: AltCoins;
	MOO: AltCoins;
	MOBI: AltCoins;
	POOF: AltCoins;
}

export interface AltCoins {
	name: CoinsNameVisual;
	coinUrl: CoinsURL;
	value: CoinsName;
	feeName: TransactionFeeTokenName;
	lowerName: CoinsNameLower;
	responseName: GetBalanceResponseEnum;
}
