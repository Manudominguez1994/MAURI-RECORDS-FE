import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";



function NavbarComp() {
  const navigate = useNavigate();

  const { isUserActive, verifyToken, handLogout } = useContext(AuthContext);

  const ejectHandLogOut = () => {
    handLogout();
    navigate("/");
  };

  return (
    <Navbar className="mb-0"  expand="lg">
      <Container>
        <Navbar.Brand className="mr-auto">
          <Link className="LinkNavbar" to="/">Home</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
          {isUserActive === true ? (
            <>
              <Nav.Link>
                <Link className="LinkNavbar" to="/my-profile">My profile</Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="LinkNavbar" to="/create-vinyl">Vender Vinilo</Link>
              </Nav.Link>
              <Nav.Link> <Link className="LinkNavbar" onClick={ejectHandLogOut} > Cerrar Sesion</Link></Nav.Link>
             
              {/* <button
                outline
                className="navbarButton"
                onClick={ejectHandLogOut}
              >
                Cerrar Sesión
              </button> */}
            </>
          ) : (
            <>
            <Nav.Link><Link className="LinkNavbar"  to="/signup">SignUp</Link></Nav.Link>
            <Nav.Link><Link className="LinkNavbar" to="/login">Login</Link></Nav.Link>
              
              
            </>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
