import React from 'react';
import {getWeb3,getContracts} from "./utils.js";
import { Link } from 'react-router-dom';
import './styles/cards.css'
import './styles/grid.css'
import './styles/maps.css'
import './styles/global.css'
import './styles/nav.css'
import { withRouter } from 'react-router-dom'
import StripeContainer from './stripe/StripeContainer'

class MintToken extends React.Component {
  constructor(props) {
		super(props)
    this.createToken = this.createToken.bind(this);
    this.check = this.check.bind(this);
    this.setPrice = this.setPrice.bind(this);
    this.setName = this.setName.bind(this);

  }
  state = {
    nfts: [],
    web3: undefined,
    accounts:[],
    contracts: undefined,
    numItems:[],
    itemStructs: [],
    uri:'',
    price:0,
    name:''
  }
  componentWillMount () {
    const init = async () => {
      let web3 = await getWeb3();
      let contracts = await getContracts(web3);
      let accounts = await web3.eth.getAccounts();
      let numTokens = await contracts.stripeMarket.methods.getItemId().call({from:accounts[0]});
      let numItems=[]
      let stars =[];
      for (let i =0; i<numTokens; i++){
        const mItem = await contracts.stripeMarket.methods.idToMarketItem(i+1).call({from: accounts[0]});
        stars.push(mItem);
        const tId = await mItem.tokenId
        const po = await contracts.nft.methods.tokenURI(tId).call({from: accounts[0]});
        numItems.push(po)
      }
      const auctionPrice = 1000000000000
      let currTokenId;
      this.setState({
        web3: web3,
        contracts: contracts,
        accounts: accounts,
        numItems: numItems,
        itemStructs: stars
      })
      console.log(this.state.itemStructs[0].price);
    }
    init();
  }
  check (event){
    this.setState({
      uri : event.target.value
    })
  }

  setPrice (event){
    this.setState({
      price : event.target.value
    })
  }
  setName (event){
    this.setState({
      name : event.target.value
    })
  }


  createToken = async()=> {
		let contracts = (this.state.contracts);
		let currTokenId ;
		await contracts.nft.methods.createToken(this.state.uri).send({from: this.state.accounts[0]})
		.then(data=>{
			currTokenId = (data.events.Transfer.returnValues.tokenId)
		})
		let listingPrice = await contracts.stripeMarket.methods.getListingPrice().call({from: this.state.accounts[0]});
		listingPrice = listingPrice.toString()
		const op = await contracts.stripeMarket.methods.createItem(contracts.nft._address, currTokenId, Number(this.state.price),this.state.name).send({from: this.state.accounts[0], value: listingPrice})
    let itemIdC = (op.events.MarketItemCreated.returnValues.itemId);
    let we= document.getElementById('tokenIdDisp');
    we.innerHTML = `TokenId: ${currTokenId} | Item Id : ${itemIdC}`
	}
  render() {
    return (
      <>
      <nav>
        <a href = "http://localhost:3000/" className="logo"></a>
        <div className="profile">
        <a href="/mint" className="button">
          <span>Mint NFT</span>
        </a>

        <a href="/account" className="button">
          <span>View Owned NFTs</span>
        </a>
        </div>
      </nav>
          <p className="myst"> Input Token Details: </p>
          <div className="minting grid four">

          <input className="card button myst" id ='tokenUri' type='text' placeholder='input link to digital asset' onKeyUp={this.check}/>
          <input className="card button" id ='price' type='text' placeholder='input price of digital asset' onKeyUp={this.setPrice}/>
          <input className="card button" id ='name' type='text' placeholder='input name of digital asset' onKeyUp= {this.setName}/>
          <br />
          <button className = "card" onClick= {this.createToken}> Mint with CELO </button>
          <p id = 'tokenIdDisp'>  </p>
        </div>
        <br />
        <a href="http://localhost:3000">
          <button className="button myst"> Back to Market</button>
        </a>
      </>
    )
  }
}
export default withRouter(MintToken)
