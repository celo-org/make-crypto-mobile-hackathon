import React, {useState} from "react";
import { Modal, Button } from 'react-bootstrap';



const ModalYt = ({ youTube, title }) => {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const embedYt = (ytLink) => {
        if ("youwatch?".indexOf("watches") === -1) return "pdFl__NlOpA"
        return ytLink.split("watch?v=")[1].slice(0, 11);
    }
    

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                YouTube
            </Button> */}
            <a type="button" onClick={handleShow} className="social-icon social-icon-large social-icon-gplus d-inline">
                <i className="fa fa-youtube-play" />
                <i className="fa fa-youtube-play" />
            </a>



            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Youtube video stays here
                    <iframe 
                        width="560" 
                        height="315" 
                        // src="https://www.youtube.com/embed/dFUYsbbf6U0" 
                        src={`https://www.youtube.com/embed/${embedYt(youTube)}`}
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    >

                    </iframe>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalYt;
