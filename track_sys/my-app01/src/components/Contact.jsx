// import { useState, useEffect } from "react";
import {Container, Row, Col} from "react-bootstrap";

const ContactButton = () => {
    const handleClick = (event) => {
        alert ("Not yet implemented...");
        console.log(event);
    }
    return(
        <button className="btn btn-primary" onClick={(handleClick)}>Contact Us</button>
    )

}

export const Contact = () => {    
    
    
    return(
        <section className="contact" id="home">
            <Container>
                <Row className="align-items-center">
                        <h1>{'Ready to get in touch?'}</h1>
                        <p>Let's enhance the way you track your operations.</p>
                        <div className="col">
                            <ContactButton />
                        </div>
                </Row>
            </Container>
        </section>
    )
}