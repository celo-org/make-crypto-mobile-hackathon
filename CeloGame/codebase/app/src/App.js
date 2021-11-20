import React from 'react';
import { Provider } from "mobx-react";
import stores from "./stores";
import './App.css';

import PersonList from './components/PersonList'
import Header from './components/Header'

function App() {
  return (
    <Provider {...stores}>
      <div className="App container">
        <Header />
        <PersonList />
      </div>
    </Provider>
  );
}

export default App;
