import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { UserContext } from "../providers/UserProvider";
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
  const { user, setUser } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  const handleSignOutClick = () => {
    // wait 1 sec in case any getCurrentUser is firing
    setTimeout(async () => {
      const res = await fetch(`http://${process.env.REACT_APP_HH_API_URL}/users/signout`, {
        method: 'POST',
      });
      if (res.ok) {
        setUser(null);
        setIsOpen(false);
        navigate('/users/signup');
      }
    }, 1000);
  }

  const handleSignUpInClick = () => {
    setIsOpen(false);
    navigate('/users/signup');
  }

  const handleToggle = (newIsOpen) => {
    setIsOpen(newIsOpen);
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-3" onToggle={handleToggle} expanded={isOpen}>
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
          <Offcanvas.Header closeButton style={{ margin: '30px 20px' }}>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg" />
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-start flex-grow-1 pe-3" style={{ height: '100%' }}>
              <NavItem style={{ textAlign: 'right', paddingTop: '20px' }}>
                <NavLink style={navLinkStyle} to="/home">Home</NavLink>
              </NavItem>
              {user ? (
                <>
                  <NavItem style={{ textAlign: 'right', paddingTop: '20px' }}>
                    <NavLink style={navLinkStyle} to={`/users/${user.id}`}>My Profile</NavLink>
                  </NavItem>
                  <NavItem style={{ textAlign: 'right', paddingTop: '20px' }}>
                    <NavLink style={navLinkStyle} to="/users/current/events">My Events</NavLink>
                  </NavItem>
                </>
              ) : null}
              <NavItem style={{ textAlign: 'right', paddingTop: '20px' }}>
                <NavLink style={navLinkStyle} to="/events">Upcoming Events</NavLink>
              </NavItem>
              <NavItem style={{ textAlign: 'right', paddingTop: '20px' }}>
                <NavLink style={navLinkStyle} to="/events?past=true">Past Events</NavLink>
              </NavItem>
              {user ? (
                <NavItem style={{ textAlign: 'right', paddingTop: '20px' }}>
                  <Button variant="primary" onClick={handleSignOutClick}>Sign Out</Button>
                </NavItem>
              ) : (
                <NavItem style={{ textAlign: 'right', paddingTop: '20px' }}>
                  <Button variant="primary" onClick={handleSignUpInClick}>Sign In/Up</Button>
                </NavItem>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
