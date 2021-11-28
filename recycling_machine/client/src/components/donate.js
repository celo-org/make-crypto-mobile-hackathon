import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Container, Row, Card, Spinner } from 'react-bootstrap'
import AppContext from '../appContext';
import { useNavigate } from 'react-router-dom'

const States = {
  BEGIN: 'begin',
  PAYING_OUT: 'payingOut',
  END_FAILURE: 'endFailure',
  END: 'end',
};
const defaultState = States.BEGIN;

const Donate = () => {
  let navigate = useNavigate();
  const { currentBalance } = useContext(AppContext);
  const [currentState, setCurrentState] = useState(defaultState);
  const [message, setMessage] = useState('');

  const resetState = () => {
    setCurrentState(States.BEGIN);
  }

  let payout = async () => {
    setCurrentState(States.PAYING_OUT);
    try {
      let msg = await axios.post("/api/addDonation");
      console.log(msg.data);
      setMessage(msg.data);
      const newState = msg.data.includes("Payment failed") ? States.END_FAILURE : States.END;
      setCurrentState(newState);
    } catch (error) {
      console.log(error.message);
      setCurrentState(States.END_FAILURE);
    }
  }

  const amountInformation = () => {
    return (
      <div>
        <h2>Total amount to donate</h2>
        <Card className='amount' style={{ width: 'fit-content' }}>
          <Card.Body className='cardBody'>
            <h3> {currentBalance / 100} $ </h3>
          </Card.Body>
        </Card>
      </div>
    );
  }

  const renderStates = () => {
    switch (currentState) {
      case States.BEGIN: return (
        <center>
          {amountInformation()}
          <Container>
            <Row>
              <Button className='button' onClick={payout}><h3>Confirm</h3></Button>
            </Row>
            <Row>
              <Button className='back-button' onClick={() => navigate(-1)}><h4>&#10094; Back</h4></Button>
            </Row>
          </Container>
        </center>
      );
      case States.PAYING_OUT: return (
        <div className='center'>
          <h4>Paying out...</h4>
          <Spinner animation="border" />
        </div>
      );
      case States.END_FAILURE: return (
        <div className='center'>
          <h4>{message}</h4>
          <Button className='button' onClick={resetState}>
            <h3>Try again!</h3>
          </Button>
        </div>
      );
      case States.END: return (
        <div className='center'>
          <h4>{message}</h4>
          <Button className='button' onClick={() => {
            navigate("/");
          }}>
            <h3>Recycle again!</h3>
          </Button>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div>
      {renderStates()}
    </div>
  )
}

export default Donate;
