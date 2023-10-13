import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate } from "react-router-dom";

import logo from '../logo.svg';


const navLinkStyle = ({ isActive, isPending }) => ({
  fontWeight: isActive ? "bold" : "",
  color: isPending ? "red" : "#0d6efd",
  textAlign: 'right',
  paddingTop: '20px',
  textDecoration: 'none',
});

function Header() {
  const navigate = useNavigate();

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
            <Nav className="justify-content-start flex-grow-1 pe-3" style={{ height: '100%' }}>
              <NavItem style={{ textAlign: 'right', paddingTop: '20px' }}>
                <NavLink style={navLinkStyle} to="/home">Home</NavLink>
              </NavItem>
              <NavItem style={{ textAlign: 'right', paddingTop: '20px' }}>
                <NavLink style={navLinkStyle} to="/events">All Events</NavLink>
              </NavItem>
              <NavItem style={{ textAlign: 'right', paddingTop: '20px' }}>
                <NavLink style={navLinkStyle} to="/users/userId">My Profile & Events</NavLink>
              </NavItem>
              <NavItem style={{ textAlign: 'right', paddingTop: '20px' }}>
                <Button variant="primary" onClick={() => navigate('/users/signup')}>Sign In/Up</Button>
              </NavItem>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
