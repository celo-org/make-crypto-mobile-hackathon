/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import { inject, observer } from "mobx-react";
import { Table, Modal, } from 'react-bootstrap';
import { shortenAddress } from '../utils/utils'
import config from '../config'

import Currency from './Currency'

const LeaderboardModal = ({show, onHide, web3Store: { web3User, leaderboardNow, lastWinners, score, scoreNow } }) => {

  const leaderboardRender = () => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardNow.filter((player, idx) => idx < config.leaderboardSize).map((player, idx) => (
            <tr key={idx} className={ player.player === web3User ? 'bg-warning' : ''}  >
              <td>{idx +1}</td>
              <td>{ player.player === web3User ? 'You' : shortenAddress(player.player) }</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  const lastWinnersRender = () => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
            <th>Prize</th>
          </tr>
        </thead>
        <tbody>
          {lastWinners.map((player, idx) => (
            <tr key={idx}>
              <td>{idx+1}</td>
              <td>{ shortenAddress(player.winner) }</td>
              <td>{player.score}</td>
              <td><Currency amount={player.prize} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  const lastWinnersV2Render = () => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
            <th>Prize</th>
          </tr>
        </thead>
        <tbody>
          {lastWinners.filter(player => player.winner !== "0x0000000000000000000000000000000000000000").map((player, idx) => (
            <tr key={idx}>
              <td>{idx < 5 ? idx+1 : 'Lottey winner'}</td>
              <td>{ shortenAddress(player.winner) }</td>
              <td>{player.score}</td>
              <td><Currency amount={player.prize} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-center"
    >
      <Modal.Header closeButton>
        <Modal.Title className="w-100" id="contained-modal-title-vcenter">
           🏆 Leaderboard
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className='mb-2'>Your Score: { +score + scoreNow }</h5>
        { leaderboardRender() }
        <h5 className='mt-4'>Last round winners:</h5>
        { lastWinners.filter(player => player.winner !== '0x0000000000000000000000000000000000000000').length === 6 ? lastWinnersV2Render() : lastWinnersRender() }
      </Modal.Body>
    </Modal>
  )
}

export default inject("web3Store")(observer(LeaderboardModal));
