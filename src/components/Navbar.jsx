import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {

  const handLogout = () => {
    localStorage.removeItem('authToken')
  }
  return (
    <div>

      <Link to='/'>Home</Link>
      <Link to='/signup'>SignUp</Link>
      <Link to='/login'>Login</Link>
      <Link to='/my-profile'>My profile</Link>

      <button onClick={handLogout}>Cerrar Sesión</button>

    </div>
  )
}

export default Navbar