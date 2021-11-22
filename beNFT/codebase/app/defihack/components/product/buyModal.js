import { useState } from "react"
import { useRouter } from "next/router"
import { loadNFTs, buyNFT} from "../../scripts/celo-client"


export default function Buy(props) {
    const state = {
        CONFIRMATION: "confirmation",
        LOADING: "loading",
        COMPLETE: "complete"
    }

    const [buyState, setBuyState] = useState(state.CONFIRMATION)

    const router = useRouter()

    const nft = props.nft

    const onClickBuy = () => {
        setBuyState(state.LOADING)
        buyNFT(nft).then(() => {
            setBuyState(state.COMPLETE)
            props.setIsBuyable(false)
        })
        setTimeout(() => {
            setBuyState(state.COMPLETE)
        }, 10000)
    }

    const onClickGoBack = () => {
        router.back()
    }

    const onClickOk = () => {
        setBuyState(state.CONFIRMATION)
        props.close()
    }

    const renderSwitch = (param) => {
        switch (param) {
            case state.CONFIRMATION:
                return (
                    <>
                        <div className="text-white flex flex-col justify-center items-center w-screen h-screen px-4">
                            <p className="text-center font-normal text-xs">{nft.name}</p>
                            <p className="text-center font-normal text-2xs">Pulmo</p>
                            <p className="text-center text-4xl font-semibold mt-4">CELO {nft.price}</p>
                            <p className="text-center text-sm font-normal mt-4">You currently have <b>$576</b> on your wallet <br />
                                Do you want to proceed with your purchase?</p>

                        </div>
                        <div className="flex items-stretch justify-items-center absolute bottom-28 left-9 right-9">
                            <button className="btn btn-lg btn-primary flex-grow mr-2" onClick={onClickBuy}>Continue</button>
                            <button className="btn btn-lg btn-tab flex-grow ml-2" onClick={onClickOk}>Go Back</button>
                        </div>
                    </>
                )
            case state.LOADING:
                return (
                    <>
                        <div className="text-white flex flex-col justify-center items-center w-screen h-screen px-4">
                            <p className="text-center font-semibold text-2xl">Loading</p>
                            <p className="text-center font-semibold text-base mt-4">We are purchasing your NFT</p>
                        </div>
                    </>
                )
            case state.COMPLETE:
                return (
                    <>
                        <div className="text-white flex flex-col justify-center items-center w-screen h-screen px-4">
                            <p className="text-center font-semibold text-2xl">Purchase complete!</p>
                            <p className="text-center font-semibold text-base">We will send you notifications about this NFT</p>
                        </div>
                        <div className="flex items-stretch justify-items-center absolute bottom-28 left-9 right-9">
                            <button className="btn btn-lg btn-primary flex-grow mr-2" onClick={onClickOk}>See my NFT</button>
                            <button className="btn btn-lg btn-tab flex-grow ml-2" onClick={onClickGoBack}>Go Back</button>
                        </div>
                    </>
                )
        }
    }

    return (<>
        {
            renderSwitch(buyState)
        }
    </>)
}