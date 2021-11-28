import Web3 from "web3"

export const utils = {
  toWei(val, unit = "ether") {
    return Web3.utils.toWei(val, unit)
  },

  fromWei(val, unit = "ether") {
    return Web3.utils.fromWei(val, unit)
  },

  shortenAddress(address = "") {
    return `${address.substr(0, 3)}...${address.substr(37, 42)}`
  },

  parseNFTURL(url) {
    if (url?.startsWith("ipfs://")) {
      return url?.replace("ipfs://", "https://ipfs.infura.io/")
    }
    return url
  },

  // handleMetamaskError(err, toastr) {
  //   toastr.e(e.message)
  // },
}
