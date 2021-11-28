import React, { useState } from 'react'
import { Row, Card, Col } from 'react-bootstrap';
import cosplayer from '../extra/cosplayer.png'

function AddItems({ createAnimeList }) {
    const [animeInputGroup, setAnimeInputGroup] = useState([]);

    const [animeInput, setAnimeInput] = useState({ animeName: "", animeImage: "", animeYouTube: "", animeDescription: "" });

    const addInputGroup = () => {
        if (animeInput.animeName.length < 2) {
            throw new Error("You need to enter a valid name") // You should set error instead
        } else {
            //  console.log(animeInput);
            setAnimeInputGroup([...animeInputGroup, animeInput])
            addAnimeAnimation()
            setAnimeInput({ animeName: "", animeImage: "", animeYouTube: "", animeDescription: "" });

        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        // call blockchain from here
        let dataArr = animeInputGroup.map((v,i) => Object.values(v))
        // console.log("onSubmit", JSON.stringify(dataArr));
        // we will be sending the dataArr to create anime list
        createAnimeList(dataArr)
        setAnimeInputGroup([])
    }

    const addAnimeAnimation = () => {
        const button = document.querySelector('.btn_');
        button.addEventListener('click', (e) => {
            e.preventDefault();
            button.classList.add('btn--clicked');
            document.querySelectorAll('.color_').forEach((element) => { element.classList.add('expanded') })

            // just to reset without having to refresh..
            setTimeout(() => { button.classList.remove("btn--clicked") }, 3500);
            setTimeout(() => { document.querySelectorAll('span').forEach((element) => { element.classList.remove('expanded') }) }, 1700)
        });

    }

    return (
        <div>
            <div className="wd_contact_wrapper wd-fixer">
                <div className="wd_form">
                    <div className="wd_layer">
                        <div className="text-center">
                            <h1 className="fw-bold">Add Picks</h1>
                            <p className="fw-light mt-3">Add the details and click "add+" to add another</p>
                        </div>

                        <form action="" onSubmit={submitHandler} className="myform">
                            <div className="text-center">
                                <input type="text"
                                    id="addItems"
                                    placeholder="Name"
                                    value={animeInput.animeName}
                                    onChange={e => setAnimeInput({ ...animeInput, animeName: e.target.value })}
                                />
                            </div>
                            <div className="text-center my-3">
                                <input type="text"
                                    placeholder="Image Link"
                                    value={animeInput.animeImage}
                                    onChange={e => setAnimeInput({ ...animeInput, animeImage: e.target.value })}
                                />
                            </div>
                            <div className="text-center">
                                <input type="text"
                                    placeholder="YouTube Trailer Link"
                                    value={animeInput.animeYouTube}
                                    onChange={e => setAnimeInput({ ...animeInput, animeYouTube: e.target.value })}
                                />
                            </div>
                            <div className="text-center my-3">
                                <input type="text"
                                    placeholder="Description"
                                    value={animeInput.animeDescription}
                                    onChange={e => setAnimeInput({ ...animeInput, animeDescription: e.target.value })}
                                />
                            </div>
                            <div>
                                <a type="button" className="float-end my-4 btn btn-danger myButton btn_" onClick={addInputGroup}>Add <sup>➕</sup></a>
                                <span className="color_ color--blue" data-value="1"></span>
                                <span className="color_ color--orange" data-value="1"></span>
                                <span className="color_ color--green" data-value="1"></span>
                                <span className="color_ color--white" data-value="1"></span>

                            </div>
                            {/* <h2>{JSON.stringify(animeInput)}</h2>
                            {animeInputGroup && console.log('onRender', animeInputGroup)}
                            {
                                animeInputGroup.map((v, i) => (
                                    <>
                                        <h2>{v.animeName}</h2>
                                        <hr />
                                    </>
                                ))
                            } */}

                            <Row xs={1} md={3} lg={4} className="g-4" style={{margin:"100px 20px 20px 20px"}}>
                                {animeInputGroup.map((v, idx) => (
                                    <Col className="me-4">
                                        <Card style={{ backgroundColor: "transparent", alignItems: "center" }}>
                                            <Card.Img style={{ width: "150px", alignItems: "center" }} variant="bottom" src={v.animeImage ? v.animeImage : cosplayer} />
                                            <Card.Body>
                                                <Card.Title>{v.animeName}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                            <hr />
                            <div className="d-grid gap-2 col-* mx-auto">
                                <button
                                    className="btn btn-outline-success fw-bolder mt-4"
                                    style={{ borderRadius: "20px", padding: "20px", margin: "0 25%" }}
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>


        </div>
    );
}

export default AddItems
