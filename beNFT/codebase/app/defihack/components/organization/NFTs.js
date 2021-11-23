import React, { Component } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import NFT from '../NTF'

export default function NFTs(props) {

    return (
        <div>
            <h3 className="font-sans text-white pl-6 text-2xl pt-5 font-semibold">NFTs</h3>
            <ScrollContainer className="scroll-container">
                <ul className="flex flex-col md:flex-row gap-4 px-6 py-3">
                    {props.nfts.map((nft, idx) => {
                        return (
                            <NFT
                                name={nft.name}
                                image={nft.image}
                                price={nft.price}
                                seller={nft.seller}
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