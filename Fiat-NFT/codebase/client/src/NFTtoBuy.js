import React from 'react'
import {Link} from 'react-router-dom'
import {getWeb3,getContracts} from "./utils.js";
import Thumbnail from './Thumbnail.js'
import { withRouter } from 'react-router-dom'
import StripeContainer from './stripe/StripeContainer'
// Components
// CSS

import './styles/cards.css'
import './styles/grid.css'
import './styles/global.css'
import './styles/gallery.css'

class NFTtoBuy extends React.Component {
	constructor(props) {
		super(props)
		this.sellToken = this.sellToken.bind(this)
		this.setAddress = this.setAddress.bind(this)
	}

	state = {
		nfts: [],
		web3: undefined,
		accounts:[],
		contracts: undefined,
		tokenUsed: [],
		buyerAddress: ''
	}



componentWillMount() {
	const init = async () => {
		let web3 = await getWeb3();
		let contracts = await getContracts(web3);
		let accounts = await web3.eth.getAccounts();
		let mItem = await contracts.stripeMarket.methods.idToMarketItem(this.props.match.params.id).call({from: accounts[0]});
		let po = (Number(mItem.price))+2
		mItem.price = po.toFixed(2).toString()
		let uri = (mItem.tokenUri);
		this.setState({
			web3: web3,
			contracts: contracts,
			accounts: accounts,
			tokenUsed: mItem
		})
		await console.log(this.state.tokenUsed);
	}
	init();
}

	setAddress(event){
		let address =(event.target.value);
		this.setState({
			buyerAddress: event.target.value
		})
	}


	sellToken = async () => {
		console.log('connects');
		let itemId = this.props.match.params.id;
		let itemS = await this.state.contracts.stripeMarket.methods.idToMarketItem(itemId).call({from: this.state.accounts[0]});
		let status = itemS.sold;

		console.log(status);
		if (status == false){
			let price = await itemS.price
			console.log(price);
			let buyer = this.state.web3.utils.toChecksumAddress(this.state.buyerAddress);
			await this.state.contracts.stripeMarket.methods.createMarketSale(this.state.contracts.nft._address, buyer, this.props.match.params.id).send({from: this.state.accounts[0]})
			.then(data=> {
				console.log(data);
			})
			let ui = await document.getElementById('message');
			ui.innerHTML= 'Item Sold'
		}
		else{
			let ui = document.getElementById('message');
			ui.innerHTML= 'Item Already Sold'
		}

	}

	render() {
		return (
			<>
			<div className="tryguy">
			<nav className = "suggest">
				<a href="/" className="logo"></a>
				<div className="profile">
				<a className = "button" href="/mint">
					<span>Mint NFT</span>
				</a>

					<a href="/account" className="button">
						<span>View Owned NFTs</span>
					</a>
				</div>
			</nav>
				<div className="gallery">
					<img src={this.state.tokenUsed.tokenUri} className= "picmain gallery"></img>
							<div className="content">
								<h3 className="myst"> Name: </h3>
								<h1 className="myst">{this.state.tokenUsed.name} </h1>
								<h3 className="myst">  Price: </h3>
								<h1 className="myst" >  $ {this.state.tokenUsed.price}</h1>
								<br />
								<h3 className="myst"> Pay </h3>
								<input onKeyUp={this.setAddress} className=" myst card button" id="buyer" type = "text" placeholder = 'address to transfer NFT'/>
								<br/>
								<p className="myst" id = "message"></p>
								<StripeContainer className="myst" sellFunc ={this.sellToken} />
							</div>

				</div>
				</div>
			</>
		)
	}
}

export default NFTtoBuy;
