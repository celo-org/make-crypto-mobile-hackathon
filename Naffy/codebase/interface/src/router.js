import Vue from "vue"
import Router from "vue-router"
import Home from "@/views/Home.vue"
import Explore from "@/views/Explore.vue"
import Creator from "@/views/creator/Single.vue"
import NewCreator from "@/views/creator/New.vue"
import CreatorDashboard from "@/views/creator/dashboard/Index.vue"
import CreatorDetail from "@/views/creator/dashboard/Detail.vue"
import CreatorProfile from "@/views/creator/dashboard/Profile.vue"
import CreatorNfts from "@/views/creator/dashboard/Nfts.vue"
import NftMint from "@/views/nft/Mint.vue"
import ViewNft from "@/views/nft/View.vue"

Vue.use(Router)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/explore",
    name: "Explore",
    component: Explore,
    meta: {
      title: "Explore",
    },
  },
  {
    path: "/creator/new",
    name: "NewCreator",
    component: NewCreator,
    meta: {
      title: "New Creator",
    },
  },
  {
    path: "/creator/dashboard",
    name: "CreatorDashboard",
    component: CreatorDashboard,
    meta: {
      title: "Creator Dashboard",
    },
  },
  {
    path: "/creator/profile",
    name: "CreatorProfile",
    component: CreatorProfile,
    meta: {
      title: "Creator Profile",
    },
  },
  {
    path: "/creator/dashboard/nfts",
    name: "CreatorNfts",
    component: CreatorNfts,
    meta: {
      title: "NFTs",
    },
  },
  {
    path: "/creator/dashboard/*",
    name: "CreatorDetail",
    component: CreatorDetail,
  },
  {
    path: "/creator/:address",
    name: "Creator",
    component: Creator,
  },
  {
    path: "/creator/:address/nfts",
    name: "CreatorNfts",
    component: CreatorNfts,
    meta: {
      title: "NFTs",
    },
  },
  {
    path: "/creator/:address/*",
    name: "CreatorDetail",
    component: CreatorDetail,
  },
  {
    path: "/nft/mint",
    name: "NftMint",
    component: NftMint,
    meta: {
      title: "Mint NFT",
    },
  },
  {
    path: "/nft/:contractAddress/:tokenId",
    name: "ViewNft",
    component: ViewNft,
  },
]

export const router = new Router({ routes })
