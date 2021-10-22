/* eslint-disable jsx-a11y/accessible-emoji */

import React from "react";
import { inject, observer } from "mobx-react";
import { Button, Row, Col, ButtonGroup } from 'react-bootstrap';

import RulesModal from './RulesModal'
import LeaderboardModal from './LeaderboardModal'
import AccountModal from './AccountModal'
import ConnectModal from './ConnectModal'

import Currency from './Currency'
import config from '../config'

import telegram from '../assets/telegram.svg'
import token from '../assets/token.png'

const Header = ({web3Store: { web3User, owner, score, prizePool, scoreNow, setBalance, setAllowance, setLeaderboard, setLastWinners, endsOn }}) => {
  const [rulesShow, setRulesShow] = React.useState(false);
  const [leaderboardShow, setLeaderboardShow] = React.useState(false);
  const [accountShow, setAccountShow] = React.useState(false);
  const [connectShow, setConnectShow] = React.useState(false);

  const connectButton = () => {
    if(web3User) {
      return ''
    }

    return (
      <Button variant='outline-dark' onClick={() => {
          setConnectShow(true)
        }
      }>
       🔓 Connect
      </Button>
    )
  }

  const accountButton = () => {
    if(!web3User) {
      return ''
    }

    return (
      <Button variant='outline-dark' onClick={() => {
          setAllowance()
          setBalance()
          setAccountShow(true)
        }
      }>
        🏦 Account
      </Button>
    )
  }

  return (
    <>
      <header className="App-header">
        <ButtonGroup className='mt-3'>
          <Button variant='outline-dark' onClick={() => setRulesShow(true)}>
            ❓ Rules
          </Button>
          <Button variant='outline-dark' onClick={() => {
              setLeaderboard()
              setLastWinners()
              setLeaderboardShow(true)
            }
          }>
            🏆 Leaderboard
          </Button>
          { connectButton() }
          { accountButton() }
        </ButtonGroup>
        <h1 className="col-auto mt-2 mb-1" onClick={() => {
            if(web3User === owner) {
              setLeaderboard()
              setLastWinners()
              setLeaderboardShow(true)
            }
          }
        }>
          DogeGame
        </h1>
        <ButtonGroup className='mb-2'>
          <Button variant='outline-dark'onClick={() => {
              setLeaderboard()
              setLastWinners()
              setLeaderboardShow(true)
            }
          }>
            <div>Prize Pool</div>
            <Currency amount={prizePool} precision={3} />
          </Button>
          <Button variant='outline-dark' onClick={() => {
              setLeaderboard()
              setLastWinners()
              setLeaderboardShow(true)
            }
          }>
            <div>Score</div>
            { +score + scoreNow }
          </Button>
          <Button variant='outline-dark' className='endsin'>
            <div>Ends on</div>
            <div>{endsOn}</div>
          </Button>
        </ButtonGroup>
      </header>

      <RulesModal
        show={rulesShow}
        onHide={() => setRulesShow(false)}
      />

      <LeaderboardModal
        show={leaderboardShow}
        onHide={() => setLeaderboardShow(false)}
      />

      <AccountModal
        show={accountShow}
        onHide={() => setAccountShow(false)}
      />

      <ConnectModal
        show={connectShow}
        onHide={() => setConnectShow(false)}
      />
    </>
  )
};

export default inject("web3Store")(observer(Header));
