import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Home() {

  const { activeUserId, isUserActive } = useContext(AuthContext);

  return (
    <div>
      <h2>MAURI RECORDS</h2>
      { isUserActive === true ? (<Link to={"/allVinyls"}>Accede a la tienda de vinilos</Link>) : <p>¡Si quieres comprar vinilos<Link to={'/login'}>inicia sesión!</Link> </p>} 
      


    </div>
  )
}

export default Home