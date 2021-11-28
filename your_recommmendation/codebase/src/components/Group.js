import React from "react";
import { CardGroup, Card, ProgressBar } from 'react-bootstrap';
import '../extra/css/font-awesome.min.css'
import ModalYt from "./ModalYt";


const Group = ({ currentGrp, donateToLike, winningName, totalVoteCount, payWinner }) => {

    const randomBg = () => {
        let randInt = Math.floor(Math.random() * (6 - 1 + 1) + 1).toString();
        let bgColors = {
            '1': 'primary',
            '2': 'secondary',
            '3': 'success',
            '4': 'danger',
            '5': 'warning',
            '6': 'info',
        }
        return bgColors[randInt];
    }

    const ratio = (val) => {
        return +val/11 * 100;
    }

    const likeButton = (name) => {
        // donateToLike(name)
        return (
            <a 
                type="button" 
                onClick={() => donateToLike(name)} 
                className="social-icon social-icon-large social-icon-gold float-end d-inline"
            >
                <i className="fa fa-thumbs-o-up" />
                <i className="fa fa-thumbs-o-up" />
            </a>
        )
    }

    const payoutBtn = () => {
        return (
            <a
                type="button" 
                style={{marginLeft: "22%"}}
                onClick={() => payWinner()}
                className="social-icon social-icon-large social-icon-pink d-inline"
            >
                <i className="fa fa-usd"></i>
                <i className="fa fa-usd"></i>
            </a>
        )
    }

    const winText = () => {
        return (
            <div className="text-center mt-5">
                <h3 className="totalVoteText glower">Winner</h3>
                <p><span style={{ color: 'red' }}>NOTE:</span> Only the watchers or the creator can payout </p>
            </div>
        )
    }
    
    


    return (
        <>
            <h3 style={{backgroundColor: "black"}}> &nbsp; </h3>
            <CardGroup className="fixMargin" id="currentVote">
                {currentGrp.map((v,i) => (
                    <Card
                        key={v[0]}
                        className="me-1"
                        text={'light'}
                        bg={'dark'}
                    >
                        <Card.Img variant="top" src={v[1]} />
                        <Card.Body>
                            <Card.Title>{v[0]} </Card.Title>
                            <Card.Text>
                                {v[3]} ---- {v[4]} votes
                                <hr />
                                {v[0] === winningName ? winText() : ""}
                            </Card.Text>

                        </Card.Body>
                        <Card.Footer>
                            <ModalYt youTube={v[2]} title={v[0]} />
                            {v[0] === winningName ? payoutBtn() : ""}
                            {likeButton(v[0])}
                        </Card.Footer>
                        <ProgressBar variant={randomBg()} now={ratio(v[4])} />
                    </Card>
                ))}

                <div className="totalVote">
                    <h5 className="totalVoteText mt-3">
                        💰 {+totalVoteCount *2}
                        <br />
                        Celo
                        <br />
                        Staked
                        {/* {totalVote*2} */}
                    </h5>
                    
                </div>

            </CardGroup>

        </>
    );
};

export default Group;
