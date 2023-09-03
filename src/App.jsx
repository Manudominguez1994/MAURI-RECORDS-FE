import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'
import Error from './pages/Error'
import NotFound from './pages/NotFound'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import IsPrivate from './components/IsPrivate'
import EditProfile from './pages/EditProfile'
import CreateVinyl from './pages/vinyl/CreateVinyl'
import AllVinyls from './pages/vinyl/AllVinyls'
import VinylDetails from './pages/vinyl/VinylDetails'
import EditVinyl from './pages/vinyl/EditVinyl'



function App() {

  
 

  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home/>}/> 
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>

        <Route path="/my-profile" element={<IsPrivate><UserProfile/></IsPrivate>}/>
        <Route path="/edit-profile" element={<IsPrivate><EditProfile/></IsPrivate>}/>

        <Route path="/create-vinyl" element={<IsPrivate><CreateVinyl/></IsPrivate>}/>
        <Route path="/allVinyls" element={<IsPrivate><AllVinyls/></IsPrivate>}/>
        <Route path="/vinylDetails/:vinyl" element={<IsPrivate><VinylDetails/></IsPrivate>}/>
        <Route path="/vinylDetails/:vinyl/edit" element={<IsPrivate><EditVinyl/></IsPrivate>}/>

        <Route path="/error" element={<Error/>}/>
        <Route path="/not-found" element={<NotFound/>}/>

      </Routes>


     
   </>
  )
}

export default App
