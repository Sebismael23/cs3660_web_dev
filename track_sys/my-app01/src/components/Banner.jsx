// import { useState, useEffect } from "react";
import {Container, Row, Col} from "react-bootstrap";
import bannerImg from "../img/banner-img1.png";

export const Banner = () => {    
    
    return(
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl = {7}>
                        <span className="tagline">Equipment tracking system</span>
                        <h1>{'Track. Monitor. Secure.'}</h1>
                        <p>Managing your business assets has never been easier. 
                            Whether it's vehicles, shipments, medical equipment, or other 
                            valuable assets, our advanced tracking solutions give you real-time 
                            visibility, security, and control. Reduce losses, optimize operations,
                             and gain peace of mind knowing exactly where your equipment is—anytime,
                              anywhere.</p>
                        <button onClick={() => console.log('start_tracking')}>Start Tracking Now</button>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={bannerImg} alt="banner Img"/>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}