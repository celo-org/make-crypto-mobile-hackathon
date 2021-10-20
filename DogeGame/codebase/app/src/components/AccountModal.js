/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import { inject, observer } from "mobx-react";
import { Modal, Row, Col, Button } from 'react-bootstrap';

import config from '../config'
import Currency from './Currency'

const AccountModal = ({show, onHide, web3Store: { paused, disconnectWallet, testWalletConnection, web3User, allowance, web3Balance, withdraw } }) => {
  const canWithdraw = (allowance !== '0' && !paused)

  const body = () => {
    if(!web3User) {
      return (
        config.noWalletMessage
      )
    }

    return (
      <>
        <Row>
          <Col xs={6}>
            Winnings<br />
            <Currency amount={allowance} /><br/>
            <Button disabled={!canWithdraw} variant='outline-dark' onClick={withdraw}>
              Withdraw
            </Button>
          </Col>
          <Col xs={6}>
            Wallet<br/>
            <Currency amount={web3Balance} />
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col xs={12}>
            <Button variant='outline-dark' onClick={testWalletConnection}>
              Test Wallet Connection
            </Button>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col xs={12}>
            <Button variant='outline-dark' onClick={() => {
              disconnectWallet()
              onHide()
            }}>
              Disconnect Wallet
            </Button>
          </Col>
        </Row>
      </>
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
          🏦 Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { body() }
      </Modal.Body>
    </Modal>
  )
}

export default inject("web3Store")(observer(AccountModal));
