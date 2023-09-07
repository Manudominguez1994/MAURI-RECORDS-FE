import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


function NavbarComp() {


  const navigate = useNavigate();

  const { isUserActive, verifyToken, handLogout } = useContext(AuthContext);

  const ejectHandLogOut = () => {
    handLogout();
    navigate("/");
  };

  return (
    <div>
     
       
        <Link to="/">Home</Link>

        {isUserActive === true ? (
          <>
            <Link to="/my-profile">My profile</Link>
            <Link to="/create-vinyl">
              <button>Vender Vinilo</button>
            </Link>
            <button outline className="navbarButton" onClick={ejectHandLogOut}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">SignUp</Link>
            <Link to="/login">Login</Link>
          </>
        )}
    
    </div>
  );
}

export default NavbarComp;
