
import Image from "next/image"
import ellipsePic from '../assets/ellipse.svg'
import Campaigns from "../components/organization/campaigns"
import NFTs from "../components/profile/NFTs"
import { loadMyNFTs } from '../scripts/celo-client'
import DataManager from '../scripts/data-manager'
import { useEffect, useState } from 'react'

const addressBeautify = (address) => {
    if (address === null) {
        return ""
    }
    return address.substring(0, 6) + "..." + address.slice(address.length - 7)
}

export default function Profile() {
    const [nfts, setNFTs] = useState([])

    const wallet = DataManager.getInstance().getUserWallet()

    useEffect(() => {
        loadMyNFTs().then(r => {
            setNFTs(r)
        })
    }, [])

    console.log(nfts)

    return (
        <>
            <div className="container mx-auto">
                <div className="mt-16 mx-auto w-28 h-28 object-cover border-4 border-primary-light rounded-full overflow-hidden relative">
                    <Image src={ellipsePic} layout="fill" alt="Nameless" />
                </div>
                <p className="text-white text-center font-semibold text-2xl mt-3">Nameless</p>
                <p className="mt-1 text-center">
                    <span className="text-primary-light font-medium text-base btn-secondary px-2 py-1 rounded-md">{addressBeautify(wallet)}</span>
                </p>
                <NFTs nfts={nfts} />
            </div>
        </>
    )
}