import React, { Component } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import Featured from './featured'

export default function Featureds(props) {

    return (
        <div>
            <h3 className="font-sans text-white pl-6 text-2xl pt-5 font-semibold">Featured</h3>
            <ScrollContainer className="scroll-container">
                <ul className="flex gap-4 px-6 py-3">
                    {props.nfts.map((nft, idx) => {
                        return (
                            <Featured
                                name={nft.name}
                                image={nft.image}
                                price={nft.price}
                                tokenId={nft.tokenId}
                                key={"nft-" + idx}
                            />
                        )
                    })}
                </ul>
            </ScrollContainer>
        </div>
    )
}