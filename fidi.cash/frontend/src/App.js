import React, { useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ContractKitProvider, Alfajores } from '@celo-tools/use-contractkit';
import '@celo-tools/use-contractkit/lib/styles.css';

import Header from './components/Header/Header';
import Offers from './views/Offers/Offers';
import OpenDeals from './components/OpenDeals/OpenDeals';
import CloseDeal from './views/CloseDeal/CloseDeal';
import AddOffer from './views/AddOffer/AddOffer';
import Offer from './views/Offer/Offer';
import Profile from './views/Profile/Profile';

import AppContext from './AppContext';
import { reducer, initialState } from './AppReducer';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContractKitProvider
      networks={[Alfajores]}
      dapp={{
        name: 'FIDI.CASH',
        description: 'Cash out your crypto (and back)',
        url: 'https://alpha-1.fidi.cash'
      }}
    >
      <AppContext.Provider value={{ state, dispatch }}>
        <Router>
          <Header />
          <Switch>
            <Route path="/deals/:dealAddress">
              <CloseDeal />
            </Route>
            <Route path="/offers/:offerAddress">
              <Offer />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/add">
              <AddOffer />
            </Route>
            <Route path="/">
              <div>
                <OpenDeals />
                <Offers />
              </div>
            </Route>
          </Switch>
        </Router>
      </AppContext.Provider>
    </ContractKitProvider>
  );
}

export default App;
