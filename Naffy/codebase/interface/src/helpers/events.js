import { web3 } from "./web3"

export const events = {
  providerEvents(provider) {
    provider.on("accountsChanged", () => {
      window.location.reload()
    })

    provider.on("disconnect", () => {
      window.location.href = "/"
    })

    provider.on("chainChanged", async (chainId) => {
      if (chainId !== "0xaef3") {
        await web3.switchChain(provider)
      }
    })
  },
}
