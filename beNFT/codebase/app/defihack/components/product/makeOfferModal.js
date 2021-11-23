import CurrencyInput from "react-currency-masked-input"
import { useState } from "react"

export default function MakeOffer(props) {
    const [offerDone, setOfferDone] = useState(false)

    const onClickMakeOffer = () => {
        setOfferDone(true)
    }

    const onClickOk = () => {
        setOfferDone(false)
        props.close()
    }

    return (<>
        {
            offerDone
                ?
                <>
                    <div className="text-white flex flex-col justify-center items-center w-screen h-screen px-4">
                        <p className="text-center font-semibold text-2xl">Thanks for your offer!</p>
                        <p className="text-center font-semibold text-base">We will send you notifications about this NFT</p>
                    </div>
                    <button className="btn btn-lg btn-primary absolute bottom-28 left-9 right-9" onClick={onClickOk}>OK</button>
                </>
                :
                <>
                    <div className="text-white flex flex-col justify-center items-center w-screen h-screen px-4">
                        <p className="text-center font-semibold text-2xl">Make an offer</p>
                        <form action="#" method="POST" className="w-full mt-6">
                            <div className="px-11">
                                <label htmlFor="price" className="block text-base font-semibold">
                                    Price
                                </label>
                                <div className="mt-1 rounded-md flex w-full px-3 py-1 bg-transparent border border-white">
                                    <span className="inline-flex items-center rounded-l-md pr-1">CELO</span>
                                    <CurrencyInput type="text" name="price" id="price" className="bg-transparent" placeholder="20.00" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <button className="btn btn-lg btn-primary absolute bottom-28 left-9 right-9" onClick={onClickMakeOffer}>Make Offer</button>
                </>
        }
    </>)
}