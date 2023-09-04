import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h2>MAURI RECORDS</h2>
      <Link to={"/allVinyls"}>Accede a la tienda de vinilos</Link>


    </div>
  )
}

export default Home