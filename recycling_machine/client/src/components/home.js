import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Button, Container, Card, Row, Col } from 'react-bootstrap';
import AppContext from '../appContext';

import aluminium from '../img/bottle-can-green5.svg';
import glass from '../img/bottle-glass-green5.svg';
import tetraPak from '../img/bottle-paper-green5.svg';
import pet from '../img/bottle-plastic-green5.svg';

const images = {
  "aluminium": aluminium,
  "glass": glass,
  "tetra_pak": tetraPak,
  "pet": pet
}

const defaultMessage = `{"pet": 0, "tetra_pak": 0, "glass": 0, "aluminium": 0}`;

const Home = () => {
  const { currentBalance, setBalance } = useContext(AppContext);
  let navigate = useNavigate();
  const client = useRef(null);
  const [wsMessage, setWsMessage] = useState(defaultMessage);
  const [shouldBlink, setShouldBlink] = useState(false);

  useEffect(() => {
    client.current = new W3CWebSocket('ws:' + window.location.hostname + ':' + window.location.port + '/sockjs-node');
    client.current.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.current.onmessage = (message) => {
      setWsMessage(message.data);
      setShouldBlink(true);
      setTimeout(() => {
        setShouldBlink(false);
      }, 3000);
      console.log(message);
    };

    return () => {
      client.current = null;
    };
  }, []);

  useEffect(() => {
    if (!wsMessage) {
      return;
    }
    const message = JSON.parse(wsMessage);
    setBalance(message["currentBalance"]);
  }, [wsMessage, setBalance]);

  const renderCard = () => {
    if (!wsMessage) {
      return;
    }
    const message = JSON.parse(wsMessage);
    const elements = Object.keys(images).map((packagingType) => {
      console.log("Lastinserted")
      return (
          <Card className={`card ${shouldBlink && message["lastInserted"] === packagingType ?
            " borderBlink" : ""}`}>
            <Card.Body className='cardBody'>
              <Card.Img variant="top" src={images[packagingType]} className='card-img-top' />
              <Card.Title className={shouldBlink &&
                message["lastInserted"] === packagingType ? "card-title-on-change" : ""}
              >
                {message[packagingType]}
              </Card.Title>
            </Card.Body>
          </Card>
      )
    });
    return (
      <React.Fragment>
        {elements}
      </React.Fragment>
    )
  }

  return (
    <div>
      <Container>
        <Row>
          {renderCard()}
        </Row>
        <Row>
          <Col>
            <div>
              <h3>Balance</h3>
              <Card className='amount'>
                <Card.Body>
                  <h3>{currentBalance / 100} $</h3>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
        <Row>
          <Button className='button' onClick={() => {
            navigate("/payoutOptions");
          }}>
            <h3>Payout</h3>
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
