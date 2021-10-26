// import React, { useState, useEffect } from 'react';
// import {
//   ContractKitProvider,
//   Alfajores,
//   Mainnet,
//   Baklava,
//   useContractKit,
//   NetworkNames,
// } from '@celo-tools/use-contractkit';
//  import '@celo-tools/use-contractkit/lib/styles.css';

// function App () {
//   const { connect, address, kit } = useContractKit();
  
//   const [isActive, setActive] = useState(1);
// 	const [isGrantor, setIsGrantor] = useState(false);
// 	const [convertToOne, setConvertToOne] = useState(true);
	 
//   const ToggleClass = (data) => () => {
//     setActive(data); 
// 	};

//   useEffect(() => {
//     async function getAccountSummary() {
//       if (address) {
//       const accounts = await kit.contracts.getAccounts();
//       const ret = await accounts.getAccountSummary(address);
//       console.log("Accounts: ", ret);
//       }
//     }
//     getAccountSummary();
//   }, [address]);

//   return (
    
//     <>
//       {address ? (
//         <div>Connected to {address}</div>

//       ) : (
//         <button onClick={connect}>Connect wallet</button>
//       )}
//     </>
//   );
// }

// function WrappedApp() {
//   return (
//     <ContractKitProvider
//     dapp={{
//       name: "My awesome dApp",
//       description: "My awesome description",
//       url: "https://example.com",
//       icon: "test",
//     }}
//     networks={[Mainnet, Alfajores, Baklava]}
//     network={{
//       name: NetworkNames.Alfajores,
//       rpcUrl: 'https://alfajores-forno.celo-testnet.org',
//       graphQl: 'https://alfajores-blockscout.celo-testnet.org/graphiql',
//       explorer: 'https://alfajores-blockscout.celo-testnet.org',
//       chainId: 44787,
//     }}
//     >
//       <App />
//     </ContractKitProvider>
//   );
// }
// export default WrappedApp;

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { WithLayout } from '../components';

import {
  Transfer,
  // Earn,
  // Vote,
  // LendOverview,
  // LendToken,
  Settings,
  NewGrant,
  // Swap,
  Dashboard,
} from '../_pages';

export default function App() {
  return (
    <Router>
      <WithLayout>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/settings" component={Settings} />
          <Route path="/transfer" component={Transfer} />
          <Route path="/new-grant" component={NewGrant} />
          {/*<Route path="/earn" component={Earn} />
          <Route path="/vote" component={Vote} />
          <Route exact path="/lend" component={LendOverview} />
          <Route path="/lend/:token" component={LendToken} />
          
          
          <Route path="/swap" component={Swap} /> */}
        </Switch>
      </WithLayout>
    </Router>
  );
}
