import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from "react-router-dom";

import logo from '../logo.svg';


function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand href="/home">
          <img src={logo} alt="Hackr Harvest Logo" style={{ height: '75px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg" />
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavItem>
                <NavLink to="/home">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/events">All Events</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/users/userId">My Profile & Events</NavLink>
              </NavItem>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
