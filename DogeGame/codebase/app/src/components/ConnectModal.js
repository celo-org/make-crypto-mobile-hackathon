/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import { inject, observer } from "mobx-react";
import { Button, Modal, } from 'react-bootstrap';
import { shortenAddress } from '../utils/utils'

import Currency from './Currency'

const ConnectModal = ({show, onHide, web3Store: { setWeb3Action } }) => {

  const connectors = () => {
    return (
      <>
        <Button className='btn-block' size='lg' variant='outline-dark' onClick={() => {
            setWeb3Action({})
            onHide()
          }
        }>
         🔓 MetaMask
        </Button>
        <Button className='btn-block' size='lg' variant='outline-dark' onClick={() => {
            setWeb3Action({})
            onHide()
          }
        }>
         🔓 Trust DApp Browser
        </Button>
        <Button className='btn-block' size='lg' variant='outline-dark' onClick={() => {
            setWeb3Action({
              connector: 'walletconnect'
            })
            onHide()
          }
        }>
         🔓 Wallet Connect
        </Button>
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
           🏆 Connect to a wallet
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { connectors() }
      </Modal.Body>
    </Modal>
  )
}

export default inject("web3Store")(observer(ConnectModal));
