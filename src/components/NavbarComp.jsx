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
    <Navbar className="mb-0" expand="lg" sticky="top">
      <div>
        <Navbar.Brand className="mr-auto">
          <Link className="LinkNavbar" to="/">
            <img src="https://res.cloudinary.com/dausfjvtt/image/upload/v1694161199/Mauri%20Records/doy7jx1352htswfalheg.png" alt="" style={{width:50}} />          
          </Link>
        </Navbar.Brand>
      </div>
      <div className="d-flex flex-row">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto d-flex flex-row justify-content-center">
            {isUserActive === true ? (
              <>
                <Nav.Link>
                  <Link className="LinkNavbar" to="/my-profile">
                    Mi perfil
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link className="LinkNavbar" to="/create-vinyl">
                    Vender Vinilo
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  {" "}
                  <Link className="LinkNavbar" onClick={ejectHandLogOut}>
                    {" "}
                    Cerrar Sesion
                  </Link>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link>
                  <Link className="LinkNavbar" to="/signup">
                    Registrarte
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link className="LinkNavbar" to="/login">
                    Iniciar sesion
                  </Link>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </div>
    </Navbar>
  );
}

export default NavbarComp;
