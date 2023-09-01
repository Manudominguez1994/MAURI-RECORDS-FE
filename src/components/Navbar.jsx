import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'


function Navbar() {
  
  const navigate = useNavigate()

  const { isUserActive, verifyToken } = useContext(AuthContext)

  
  const handLogout = () => {
    localStorage.removeItem('authToken')

    verifyToken()
    navigate('/login')
  }
  return (
    <div>
      <Link to='/'>Home</Link>

      {isUserActive === true
      ? (
        <>
          <Link to='/my-profile'>My profile</Link>
          <button onClick={handLogout}>Cerrar Sesión</button>
        </>
      ) : (
        <>
          <Link to='/signup'>SignUp</Link>
          <Link to='/login'>Login</Link>
        </>
      )
      }
        

      


    </div>
  )
}

export default Navbar