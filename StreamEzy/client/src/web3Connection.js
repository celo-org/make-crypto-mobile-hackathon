import Web3 from "web3";

const web3Connection = async () => {
  let web3;
  if (window.ethereum !== "undefined") {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    console.log(account);
    web3 = new Web3(window.ethereum);
  }

  return web3;
};

export default web3Connection;
