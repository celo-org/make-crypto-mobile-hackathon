import React, { useState } from 'react';
//import { createContext, useContext } from "react";
import './App.css';
// import axios from 'axios';
// import { Button, Container, Card, Row } from 'react-bootstrap'
// import { w3cwebsocket as W3CWebSocket } from "websocket";
import PayoutOptions from "./components/payoutOptions";
import PayOut from "./components/payOut";
import Donate from './components/donate';
import AppContext, { defaultAppState } from './appContext';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './components/home';

function App() {
  const [currentBalance, setCurrentBalance] = useState(0);

  return (
    <AppContext.Provider value={{
      ...defaultAppState,
      currentBalance,
      setBalance: (newBalance) => {
        setCurrentBalance(newBalance);
      },
    }}>
      <div className='App'>
        <div className='picture'>
          <br />
          <h3 style={{marginTop: '5vw'}}>Crypto Recycling Machine</h3>
          <div className='center'>
            <br/>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/payout/:paymentOption" element={<PayOut />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/payoutOptions" element={<PayoutOptions />} />
              </Routes>
            </Router>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
