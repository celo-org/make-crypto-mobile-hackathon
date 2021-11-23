import React, { Component } from "react"
import Image from "next/image"

export default function Campaign(props) {
    return (
        <div className="relative">
            <div className="rounded-md w-20 h-16 object-cover overflow-hidden relative">
                <Image src={props.image} layout="fill" alt="Duda Love" />
            </div>
            <p className="text-white font-semibold text-2xs text-center">{props.name}</p>
            <div className="bg-black bg-opacity-40 rounded-full w-4 h-4 flex content-center justify-center absolute right-1 top-1" style={{ paddingTop: "0.1rem" }}>
                <Image src="/heart.svg" width="11px" height="13px" alt="Favorite" />
            </div>
        </div>
    )
}