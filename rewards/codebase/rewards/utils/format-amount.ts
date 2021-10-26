import BigNumber from 'bignumber.js';
import Web3 from 'web3';

export function formatAmount(raw: string | BigNumber) {
  const wei = typeof raw === 'string' ? raw : raw.toFixed(0);
  const ether = Web3.utils.fromWei(wei, 'ether');

  return Number(ether).toLocaleString('en', { maximumFractionDigits: 2 });
}

export function toWei(raw: string) {
  if (!raw) {
    return '0';
  }

  try {
    return Web3.utils.toWei(raw, 'ether');
  } catch (_) {
    return 'Invalid number';
  }
}
