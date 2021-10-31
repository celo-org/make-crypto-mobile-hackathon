import React from 'react';
import { inject, observer } from "mobx-react";
import { Button, Row, Col } from 'react-bootstrap';

import Person from './Person'
import Score from './Score'
import PersonModal from './PersonModal'
import Currency from './Currency'
import config from '../config'

const PersonItem = ({ person, web3Store: { price, web3User } }) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button className='person' variant="light" onClick={() => setModalShow(true)}>
        <h4>
          {person.name}
        </h4>
        <Person person={person} />
        <Row>
          <Col xs={{ span: 6 }} className='p-0'>
            <Score person={person} />
          </Col>
          <Col xs={{ span: 5, offset: 1 }} className='btn btn-primary'>
            <div>Adopt</div>
            <Currency amount={price} />
          </Col>
        </Row>
      </Button>

      <PersonModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        person={person}
      />
    </>
  )
}

export default inject("web3Store")(observer(PersonItem));
