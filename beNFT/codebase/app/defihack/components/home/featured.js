import React, { Component } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Featured(props) {
    return (
        <div className="relative shadow-sm rounded-md w-32 h-28 flex-shrink-0 overflow-hidden">
            <Image src={props.image} width="127px" height="112px" objectFit="cover" className="absolute" alt="Duda Love" />
            <div className="gradientBackground w-full h-8 text-white absolute bottom-0">
                <div className="flex justify-between items-center content-center h-full px-3">
                    <p className="text-2xs">
                        {props.name}
                        <br />
                        CELO {props.price}
                    </p>

                    <Link href={"/product/buy/" + props.tokenId} passHref>
                        <button className="btn-sm btn-primary">Buy</button>

                    </Link>
                </div>
            </div>
            <div className="bg-black bg-opacity-40 rounded-full w-4 h-4 flex content-center justify-center absolute right-2 top-2" style={{ paddingTop: "0.1rem" }}>
                <Image src="/heart.svg" width="11px" height="13px" alt="Favorite" />
            </div>
        </div>
    )
}