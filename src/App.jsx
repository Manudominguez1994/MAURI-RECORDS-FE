import NavbarComp from './components/NavbarComp'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'
import Error from './pages/Error'
import NotFound from './pages/NotFound'
import { Routes, Route } from 'react-router-dom'


import IsPrivate from './components/IsPrivate'
import EditProfile from './pages/EditProfile'
import CreateVinyl from './pages/vinyl/CreateVinyl'
import AllVinyls from './pages/vinyl/AllVinyls'
import VinylDetails from './pages/vinyl/VinylDetails'
import EditVinyl from './pages/vinyl/EditVinyl'
import EditImage from './components/EditImage'
import EditImageVinyl from './components/EditImageVinyl'
import OperationConfirm from './pages/operation/OperationConfirm'





function App() {

  
 

  return (
    <>
    <NavbarComp/>

      <Routes>
        {/* Global routes */}
        <Route path="/" element={<Home/>}/> 
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>

        {/* User routes */}
        <Route path="/my-profile" element={<IsPrivate><UserProfile/></IsPrivate>}/>
        <Route path="/edit-profile" element={<IsPrivate><EditProfile/></IsPrivate>}/>
        <Route path="/edit-image" element={<IsPrivate><EditImage/></IsPrivate>}/>

        {/* Vinyl routes */}
        <Route path="/create-vinyl" element={<IsPrivate><CreateVinyl/></IsPrivate>}/>
        <Route path="/allVinyls" element={<IsPrivate><AllVinyls/></IsPrivate>}/>
        <Route path="/vinylDetails/:vinyl" element={<IsPrivate><VinylDetails/></IsPrivate>}/>
        <Route path="/vinylDetails/:vinyl/edit" element={<IsPrivate><EditVinyl/></IsPrivate>}/>
        <Route path="/vinylDetails/:vinyl/editImage" element={<IsPrivate><EditImageVinyl/></IsPrivate>}/>
       

         {/* Operation routes */}
        <Route path="/operationConfirm/:operationId" element={<IsPrivate><OperationConfirm/></IsPrivate>}/>

        {/* Error routes */}
        <Route path="/error" element={<Error/>}/>
        <Route path="/not-found" element={<NotFound/>}/>

      </Routes>


     
   </>
  )
}

export default App
