//componente envoltorio que determina si una ruta es accesible o no dependiendo si el usuario está logueado o no
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"



function IsPrivate(props) {



const { isUserActive } = useContext(AuthContext)

if (isUserActive === true) {
    return props.children //continua con la navegación
} else {
    // return <Navigate to='/login'/>
    return <Navigate to={"/login"}/>
    
}

}

export default IsPrivate