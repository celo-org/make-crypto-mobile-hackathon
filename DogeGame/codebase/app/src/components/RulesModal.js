/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import { inject, observer } from "mobx-react";
import { Modal, Table } from 'react-bootstrap';

import config from '../config'
import telegram from '../assets/telegram.svg'

class RulesModal extends React.Component {

  rules() {
    return (
      <dl id='rules'>
        <span className='general'>
          <dd>Take Over a dog & change it's bark.</dd>
          <dd>You score 1 point every second you hold the dog.</dd>
          <dd>The fee you pay to Take Over goes into a Prize Pool</dd>
          <dd>When the round ends we distribute the Prize Pool to the winners. We then reset the scores and start the next round.</dd>
        </span>
      </dl>
    )
  }

  faq() {
    return (
      <dl id='rules'>
        <dt>FAQ:</dt>

        <dt>When do the rounds end?</dt>
        <dd>
          Rounds end everyday at 12PM UTC.
        </dd>

        <dt>How is the Prize Pool distributed?</dt>
        <dd>
          Prize Pool is distributed amongst the best players in the following way:

          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>1st</td><td>32%</td>
              </tr>
              <tr>
                <td>2nd</td><td>22%</td>
              </tr>
              <tr>
                <td>3rd</td><td>11%</td>
              </tr>
              <tr>
                <td>4th</td><td>8%</td>
              </tr>
              <tr>
                <td>5th</td><td>6%</td>
              </tr>
              <tr>
                <td>6th</td><td>5%</td>
              </tr>
              <tr>
                <td>7th</td><td>4%</td>
              </tr>
              <tr>
                <td>8th</td><td>2%</td>
              </tr>
              <tr>
                <td>Dog Breeders<br/>(Dev Team)</td><td>10%</td>
              </tr>
            </tbody>
          </Table>
        </dd>

        <dt>What happens when the round ends?</dt>
        <dd>- The game is paused for a short period of time.</dd>
        <dd>- Prize Pool gets distributed. Winners are then able to withdraw their winnings in the Account section.</dd>
        <dd>- All scores are reset to 0.</dd>
        <dd>- Game is unpaused and the next round starts.</dd>
      </dl>
    )
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-center"
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100" id="contained-modal-title-vcenter">
            ❓ Rules
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { this.rules() }
        </Modal.Body>
        <Modal.Title className="w-100" id="telegram">
          <a href={config.telegramUrl} target='_blank' rel='noopener noreferrer' className='col-xs-3 text-left'>
            <img src={telegram} alt='telegram' />Telegram Support
          </a>
        </Modal.Title>
        <Modal.Body>
          { this.faq() }
        </Modal.Body>
      </Modal>
    );
  }

}

export default inject("web3Store")(observer(RulesModal));
