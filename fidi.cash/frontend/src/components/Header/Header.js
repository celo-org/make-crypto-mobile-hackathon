import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContractKit } from '@celo-tools/use-contractkit';
import AppContext from '../../AppContext';
import { ReactComponent as ProfileIcon } from './profile.svg';
import { registerUser } from '../../api';
import './Header.css';

export default function Header() {
  const { state, dispatch } = useContext(AppContext);
  const { address: addr, connect } = useContractKit();
  const address = typeof addr === 'string' ? addr.toLowerCase() : addr;

  useEffect(() => {
    if (!address) {
      return;
    }

    registerUser({ address });
  }, [address]);

  return (
    <React.Fragment>
      <header className="app-header">
        <div className="main-header">
          <Link to="/">
            <h1 className="app-header__text">FIDI.CASH</h1>
          </Link>
          {!address ? (
            <button type="button" className="button--small" onClick={connect}>
              Connect wallet
            </button>
          ) : (
            <Link to="/profile" className="app-header__profile">
              <span className="app-header__address">{`${address.slice(
                0,
                5
              )}...${address.slice(-3)}`}</span>
              <div className="app-header__icon">
                <ProfileIcon className="app-header__icon-svg" />
              </div>
            </Link>
          )}
        </div>
        <div className="sub-header">Cash out your crypto (and back)</div>
      </header>
    </React.Fragment>
  );
}
