import Campaigns from "../components/home/campaigns"
import Explore from "../components/home/explore"
import Featureds from "../components/home/featureds"
import BuyNFTs from "../components/home/BuyNTFs"
import { loadNFTs } from '../scripts/celo-client'
import DataManager from '../scripts/data-manager'
import Image from "next/image"

import { useContractKit } from '@celo-tools/use-contractkit';
import '@celo-tools/use-contractkit/lib/styles.css';
import { useEffect, useState } from 'react'

const addressBeautify = (address) => {
  return address.substring(0, 5) + "..." + address.slice(address.length - 3)
}

export default function Home() {
  const { address, connect } = useContractKit()
  const [connectButtonText, setConnectButtonText] = useState(null)

  console.log(useContractKit())

  const [NFTs, setNFTs] = useState(DataManager.getInstance().getNFTs())

  useEffect(() => {
    loadNFTs().then(r => {
      DataManager.getInstance().setNFTs(r)
      setNFTs(r)
    })
  }, [])

  useEffect(() => {
    setConnectButtonText(address ? addressBeautify(address) : 'Connect Wallet')
    DataManager.getInstance().setUserWallet(address)
  }, [address]);
  return (
    <div className="pt-12">
      <nav className="flex justify-between pr-4 mb-3">
        <div className="text-white flex ml-6">
          <div className="relative w-4 h-5 object-contain mr-1">
            <Image src="/logo.png" width="14px" height="21px" alt="logo" />
          </div>
          beNFT
        </div>
        <button className="btn btn-secondary text-xs" onClick={connectWallet}>{connectButtonText}</button>
      </nav>

      <Explore />

      <Featureds nfts={NFTs} />

      <Campaigns />

      <BuyNFTs nfts={NFTs} />
    </div>
  )

  async function connectWallet() {
    try {
      let connector = await connect()
      setConnectButtonText(addressBeautify(connector.account))
      DataManager.getInstance().setUserWallet(connector.account)
      loadNFTs().then(r => {
          DataManager.getInstance().setNFTs(r)
          setNFTs(r)
      })
    } catch (error) {
      console.log(error)
    }
  }
}