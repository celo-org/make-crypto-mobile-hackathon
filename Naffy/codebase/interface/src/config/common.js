export const common = {
  supportTokens: ["CELO", "cUSD", "cEUR"],
  allTokens: ["CELO", "cUSD", "cEUR", "NFT"],
  activities: ["SUPPORT", "WITHDRAW", "MINT"],
  zeroAddress: "0x0000000000000000000000000000000000000000",
  creatorCategories: [
    { title: "Software", slug: "software" },
    { title: "Music", slug: "music" },
    { title: "Video", slug: "video" },
    { title: "Podcast", slug: "podcast" },
    { title: "Writing", slug: "writing" },
    { title: "Non profit", slug: "non-profit" },
    { title: "Art", slug: "art" },
  ],
  walletConnectable: [
    { name: "Metamask", image: "/assets/images/metamask.png" },
    { name: "Celowallet", image: "/assets/images/celowallet.svg" },
  ],
  alfajoresConnectParams: {
    chainId: "0xaef3",
    chainName: "Alfajores Testnet",
    nativeCurrency: { name: "Alfajores Celo", symbol: "CELO", decimals: 18 },
    rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
    blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.org/"],
    iconUrls: ["future"],
  },
  socialMedia: ["Facebook", "Twitter", "Instagram", "TikTok", "YouTube"],
}
