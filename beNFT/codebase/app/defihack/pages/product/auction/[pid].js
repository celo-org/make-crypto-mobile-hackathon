import React, { Component } from 'react'
import { useRouter } from 'next/router'
import BackNav from '../../../components/backNav'
import planetaPic from '../../../assets/planeta.svg'
import Image from 'next/image'
import Tabs from '../../../components/tabs'
import { XIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import MakeOffer from '../../../components/product/makeOfferModal'

export default function AuctionProduct() {
    const router = useRouter()
    const { pid } = router.query

    const [modalHidden, setModalHidden] = useState(true)

    const toggleModal = () => {
        setModalHidden(!modalHidden)
    }

    return (
        <>
            <div className="container mx-auto">
                <BackNav />

                <div className="w-80 h-72 relative mx-auto rounded-md overflow-hidden">
                    {/* <Image src={dudaPic} layout="fill" alt="Duda Love" /> */}
                    <div className="bg-black bg-opacity-40 rounded-full w-7 h-7 flex content-center justify-center absolute right-2 top-2 pt-1">
                        <Image src="/heart.svg" width="17px" height="17px" alt="Favorite" />
                    </div>
                </div>

                <div className="px-6 flex mt-7 justify-start justify-items-stretch items-center">
                    <div className="w-10 h-10">
                        {/* <Image src={planetaPic} width="39px" height="39px" alt="Planeta" /> */}
                    </div>
                    <p className="text-white text-base font-semibold ml-2 flex-grow leading-4">
                        <span className="text-2xs font-normal">Pulmo</span>
                        <br />
                        Kitchen
                    </p>
                    <p className="text-white text-base font-semibold ml-2 text-right leading-4">
                        <span className="text-2xs font-normal">Current bid</span>
                        <br />
                        CELO 15.00
                    </p>
                </div>

                <p className="px-6 text-white mt-6 text-sm font-normal" style={{ minHeight: "175px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <div className="px-6">
                    <button className="btn btn-lg btn-primary w-full" onClick={toggleModal}> Place a bid</button>
                </div>

                <Tabs active="Home" root={false} router={router}>
                    <div icon="home" label="Home" />
                    <div icon="search" label="Search" />
                    <div icon="fav" label="Favorites" />
                    <div icon="profile" label="Profile" />
                </Tabs>
            </div>
            <div className={"modal bg-opacity-70 bg-background backdrop-filter backdrop-blur-2xl fixed top-0 w-screen h-screen z-50" + (modalHidden ? " hidden" : "")}>
                <button className="text-white h-7 w-7 absolute top-10 right-5" onClick={toggleModal}><XIcon /></button>
                <MakeOffer close={toggleModal}/>
            </div>
        </>
    )
}