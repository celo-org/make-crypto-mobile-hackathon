import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AllNFTs from './AllNFTs'
import NFTtoBuy from './NFTtoBuy'
import MintToken from './MintToken'
import ViewNfts from './ViewNfts'

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/account" component={ViewNfts} />
					<Route path="/mint" component={MintToken} />

					<Route path="/:id" component={NFTtoBuy} />
					<Route path="/" component={AllNFTs} />

				</Switch>
			</BrowserRouter>
		)
	}
}

export default App;
