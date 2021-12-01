import {contractApi} from './';

const getPoolBalances = async (addressPool, walletAddress, rewardsNumber) => {
  let data = {
    addressPool: addressPool,
    walletAddress: walletAddress,
    rewardsNumber: rewardsNumber,
  };
  const result = await contractApi.post('/getInfoPool', data);
  return result;
};

export default getPoolBalances;
