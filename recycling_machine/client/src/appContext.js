
import {createContext} from 'react';

export const defaultAppState = {
  currentBalance: 0,
};

const defaultFunction = () => {};

export default createContext({
  ...defaultAppState,
  
  setBalance: defaultFunction(),
});