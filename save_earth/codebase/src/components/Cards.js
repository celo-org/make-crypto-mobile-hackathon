import React from "react";
import '../extra/css/style.css'
import { Col, Row, Card } from 'react-bootstrap';

const Cards = ({everyAnime}) => {

    const randomBg = () => {
        let randInt = Math.floor(Math.random() * (7 - 1 + 1) + 1).toString();
        let bgColors = {
            '1': 'Primary',
            '2': 'Secondary',
            '3': 'Success',
            '4': 'Danger',
            '5': 'Warning',
            '6': 'Info',
            '7': 'Dark',
        }
        return bgColors[randInt];
    }
    
    everyAnime = everyAnime.filter((val => val[0] !== ''))
    

    return (
        <>
            {/* pass-in all the animes in an array */}
            <Row xs={1} md={3} lg={5} className="g-0 padder" id="tabs_">
                {everyAnime.map((v, idx) => (
                    <Col key={v[0]}>
                        <Card
                            bg={randomBg().toLowerCase()}
                            text={'light'}
                            className="mb-5 me-1"
                            id="allcards"

                        >
                            <Card.Img variant="top" src={v[1]} />
                            <Card.Body>
                                <Card.Title>{v[0]} </Card.Title>
                                <Card.Text>
                                    {v[3]}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default React.memo(Cards);
