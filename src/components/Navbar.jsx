import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'


function Navbar() {
  
  const navigate = useNavigate()

  const { isUserActive, verifyToken, handLogout } = useContext(AuthContext)

  
  const ejectHandLogOut = () => {
    handLogout()
    navigate('/')
  }
  
  return (
    <div>
      <Link to='/'>Home</Link>

      {isUserActive === true
      ? (
        <>
          <Link to='/my-profile'>My profile</Link>
          <button onClick={ejectHandLogOut}>Cerrar Sesión</button>
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