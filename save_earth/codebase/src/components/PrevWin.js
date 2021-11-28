import React from "react";
import { Col, Row, Card } from 'react-bootstrap';

const PrevWin = ({ reigningGrp, reigningWinner }) => {

    return (
        <Row xs={1} md={2} className="g-4">
            <Col>
                <Card>
                    <Card.Img src={reigningGrp[1]} alt="" />
                </Card>
                {/* <img class="text-center" src={reigningGrp[1]} alt="" /> */}
            </Col>

            <Col>
                <Card>
                    <Card.Header>👑 {reigningGrp[0]} 👑</Card.Header>
                    <Card.Body>
                        <Card.Title>Winner: {reigningWinner}</Card.Title>
                        <Card.Text>
                            {/* {console.log('reigningGrp', reigningGrp)} */}
                            {/* <hr /> */}
                            {reigningGrp[3]}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default React.memo(PrevWin);
