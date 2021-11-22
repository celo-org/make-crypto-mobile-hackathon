import React, { Component } from "react"
import Image from "next/image"
import Link from "next/link"
import PropTypes from 'prop-types'

export default class NFT extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        seller: PropTypes.string.isRequired,
        tokenId: PropTypes.string.isRequired,
        itemId: PropTypes.string.isRequired,
        sold: PropTypes.bool.isRequired
    }
    
    render() {
        return (
            <div className="relative shadow-sm rounded-md w-80 h-72 flex-shrink-0 overflow-hidden mx-auto">
                <Image src={this.props.image} width="320px" height="288px" objectFit="cover" className="absolute" alt="Duda Love" />
                <div className="gradientBackground w-full h-16 text-white absolute bottom-0">
                    <div className="flex justify-between items-center content-center h-full px-5">
                        <p className="text-xs">
                            {this.props.name}
                            <br />
                            <span className="text-2xs">Pulmo</span>
                            <br />
                            CELO {this.props.price}
                        </p>

                        <Link href={"/product/buy/" + this.props.tokenId} passHref>
                            <button className="btn btn-primary">Buy</button>
                        </Link>
                    </div>
                </div>
                <div className="bg-black bg-opacity-40 rounded-full w-7 h-7 flex content-center justify-center absolute right-2 top-2 pt-1">
                    <Image src="/heart.svg" width="17px" height="20px" alt="Favorite" />
                </div>
            </div>
        )
    }
}