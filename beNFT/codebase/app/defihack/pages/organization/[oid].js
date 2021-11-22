import BackNav from "../../components/backNav"
import Image from "next/image"
import planetaPic from '../../assets/planeta.svg'
import Campaigns from "../../components/organization/campaigns"
import pulmoCat from "../../assets/PulmoCat.png"
import pulmoHouse from "../../assets/PulmoHouse.png"
import NFTs from "../../components/organization/NFTs"
import DataManager from "../../scripts/data-manager"

export default function Organization() {
    const activeCampaigns = [
        {
            image: pulmoCat,
            name: "Pulmo Cat"
        }
    ]

    const closedCampaigns = [
        {
            image: pulmoHouse,
            name: "Pulmo House"
        }
    ]

    const nfts = DataManager.getInstance().getNFTs()

    return (
        <>
            <div className="container mx-auto">
                <BackNav/>

                <div className="mx-auto w-28 h-28 object-cover border-4 border-primary-light rounded-full overflow-hidden relative">
                    <Image src={planetaPic} layout="fill" alt="Pulmo"/>
                </div>
                <p className="text-white text-center font-semibold text-2xl mt-3">Pulmo</p>

                <Campaigns active={true} campaigns={activeCampaigns}/>
                <Campaigns active={false} campaigns={closedCampaigns}/>

                <NFTs nfts={nfts}/>
            </div>
        </>
    )
}