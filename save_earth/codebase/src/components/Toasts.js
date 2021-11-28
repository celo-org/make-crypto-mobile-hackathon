import React from "react";
import { Col, Toast } from 'react-bootstrap';

const Toasts = ({ show, setShow, title, body}) => {

    return (
        <>
            <Col xs={6}>
                <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">{title==="success" ? '✔' : "⚠"} {title} Title</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {body} body
                    </Toast.Body>
                </Toast>
            </Col>
        </>
    );
};

export default Toasts;
