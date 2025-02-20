import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from '../img/logo.png'
import { Link } from "react-router-dom";


export const NavBar = () => {
    const [activeLink, setActiveLink] = useState ('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect (() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll)
        
        return () => window.removeEventListener("scroll", onScroll) 
    }, [])

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    }

    return (
    <Navbar expand="md" className={scrolled ? "scrolled": ""}>
      <Container>
        <Navbar.Brand href="#home">
            <img src={logo} alt = "logo"  />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            {/* <span className = "navbar-toogler-icon"></span>
        </Navbar.Toggle> */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as ={Link} to ="/" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
            <Nav.Link as ={Link} to ="/about" className={activeLink === 'about' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('about')}>About</Nav.Link>
          </Nav>
          <span className = "navbar-text">
            <button className="vvd" onClick={() => console.log('get_started')}><span>Get Started</span></button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}