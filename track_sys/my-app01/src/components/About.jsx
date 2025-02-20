// import { useState, useEffect } from "react";
import {Container, Row, Col} from "react-bootstrap";
import abtus_Img from "../img/abt_us1.jpeg";

export const About = () => {    
    
    return(
        <section className="abt01" style={{ flex: 1 }}>
            <Container>
                <Row className="align-items-center" tyle={{ minHeight: '80vh' }}>
                    <Col xs={12} md={6} xl = {7}>
                        <h1>{'About US'}</h1>
                        <p>At Tracksure, we are dedicated to helping businesses take control of their most valuable assets. From trucks and vehicles to medical equipment and shipments, we provide advanced tracking solutions that give you real-time visibility, security, and peace of mind. Our mission is to simplify asset management, reduce operational risks, and ensure that your equipment is always where it needs to be.</p>
                        <button onClick={() => console.log('more_info')}>More Info</button>
                    </Col>
                    {/* <Col xs={12} md={6} xl={5}>
                        <img src={abtus_Img} alt="About us"/>
                    </Col> */}
                </Row>
            </Container>
        </section>
    )
}