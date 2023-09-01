//componente envoltorio que determina si una ruta es accesible o no dependiendo si el usuario está logueado o no
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"


function IsPrivate(props) {

const navigate = useNavigate()

const { isUserActive } = useContext(AuthContext)

if (isUserActive === true) {
    return props.children //continua con la navegación
} else {
    // return <Navigate to='/login'/>
    return navigate('/login')
    
}

}

export default IsPrivate