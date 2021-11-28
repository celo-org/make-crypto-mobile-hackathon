import React from 'react';
import axios from 'axios';
import {getWeb3,getContracts} from "./utils.js";
import { Link } from 'react-router-dom';
import './styles/cards.css'
import './styles/grid.css'
import './styles/nav.css'
import './styles/global.css'
import Thumbnail from './Thumbnail.js'
import { withRouter } from 'react-router-dom'

class AllNFTs extends React.Component {
	constructor(props) {
		super(props)
}
	state = {
		nfts: [],
		web3: undefined,
		accounts:[],
		contracts: undefined,
		price: 0,
		numItems:[],
		itemStructs: []
	}

	componentWillMount() {
		const init = async () => {
			let web3 = await getWeb3();
			let contracts = await getContracts(web3);
			let accounts = await web3.eth.getAccounts();
			const auctionPrice = 20;
			let currTokenId;
			let listingPrice = await contracts.stripeMarket.methods.getListingPrice().call({from: accounts[0]});
			listingPrice = listingPrice.toString()
			//await contracts.nft.methods.createToken("https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/ada-lovelace-english-mathematician-science-source.jpg").send({from:accounts[0]})
			//.then (data => {
			//	currTokenId = data.events.Transfer.returnValues.tokenId
			//})
			//await contracts.stripeMarket.methods.createItem(contracts.nft._address, currTokenId, auctionPrice, "Eugene Lee Yang").send({from:accounts[0], value: listingPrice })
			let numTokens = await contracts.stripeMarket.methods.getItemId().call({from:accounts[0]});
			await contracts.stripeMarket.methods.fetchItemsCreated().call({from: accounts[0]})
			.then(data=>console.log(data))

			let numItems=[]
			let stars =[];
			//console.log(contracts.stripeMarket);
			for (let i =0; i<numTokens; i++){
				const mItem = await contracts.stripeMarket.methods.idToMarketItem(i+1).call({from: accounts[0]});
				let cup = await mItem.tokenUri;
				let pr = (Number(mItem.price))+2;
				mItem.price = pr.toFixed(2).toString()
				stars.push(mItem);
				const tId = await mItem.tokenId
				const po = await contracts.nft.methods.tokenURI(tId).call({from: accounts[0]});
				numItems.push(po)
			}

			await this.setState({
				web3: web3,
				contracts: contracts,
				accounts: accounts,
				numItems: numItems,
				itemStructs: stars,
			})
		}
		init();
	}


	render() {
		return (
			<>
			<div  className="tryguy">
			<nav className = "suggest">
				<Link to="/" className="logo"> </Link>
				<div className="profile">
				<a href="/mint" className="button">
					<span>Mint NFT</span>
				</a>

					<a href="/account" className="button">
						<span>View Owned NFTs</span>
					</a>
				</div>
			</nav>
					<div className="grid four large">
						{// List of thumbnails
						this.state.numItems.map((item,index) => (
							<Thumbnail image_id = {item} image_name= {this.state.itemStructs[index].name} image_price= {this.state.itemStructs[index].price} image_itemId ={this.state.itemStructs[index].itemId} image_status= {this.state.itemStructs[index].sold}/>
						))}
					</div>
					</div>
			</>
		)

	}

}

export default withRouter(AllNFTs)
