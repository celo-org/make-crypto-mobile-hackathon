/* eslint-disable jsx-a11y/accessible-emoji */

import React from "react";
import PersonItem from './PersonItem'
import { inject, observer } from "mobx-react";
import { Row, Col } from 'react-bootstrap';

const PersonList = ({ web3Store: { persons, paused } }) => {
  if (paused && (new Date() < new Date(Date.UTC(2021, 8, 6)))) {

    return (
      <div id='paused' className='m-2 p-4'>
        <h3>🚀🧑‍🚀🚀</h3>
        <h3>Launch</h3>
        <h3>12PM UTC</h3>
        <h3>5th of September</h3>
        <h3>🚀🧑‍🚀🚀</h3>
      </div>
    )
  }


  if (paused) {
    return (
      <div id='paused' className='m-2 p-4'>
        <h1>GAME IS PAUSED</h1>
        <h3>🛠️</h3>
        <h3>We will be back soon ⏳</h3>
      </div>
    )
  }

  if (persons && persons.length) {
    return (
      <Row>
        {persons.map(person => (
          <Col key={person.image} xl={3} lg={4} md={6} sm={12} className='my-3 px-sm-2 px-1 p-0' >
            <PersonItem
              person={person}
            />
          </Col>
        ))}
      </Row>
    )
  }
};

export default inject("web3Store")(observer(PersonList));
