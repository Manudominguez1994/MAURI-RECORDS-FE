import { createContext, useEffect, useState } from "react";
import service from "../services/service.config";

const AuthContext = createContext()

function AuthWrapper(props) {

    const [ isUserActive, setIsUserActive ] = useState(false)
    const [ activeUserId, setActiveUserId ] = useState(null)
    const [ isPageLogin, setIsPageLogin ] = useState(true)

    useEffect(() => {
        verifyToken()
    }, [])

    const verifyToken = async () => {

        // al inicio de la función mostrar spinner mientras se valida el token
        setIsPageLogin(true)

        try {
            
            const response = await service.get("/auth/verify")
            // console.log(response)

            setIsUserActive(true)
            setActiveUserId(response.data._id)
            setIsPageLogin(false)

        } catch (error) {
            console.log(error)
            setIsUserActive(false)
            setActiveUserId(null)
            setIsPageLogin(false)
        }
    }
    const handLogout = () => {
      localStorage.removeItem('authToken')
      verifyToken()
    }

    const passedContext = {
        verifyToken, // para validad token en login o logout
        isUserActive, // para mostrar enlaces dependiendo de si el usuario está logueado o no. Ver páginas privadas
        activeUserId, // mostrar funcionalidades de borrar o editar solo cuando el usario sea el dueño de un documento
        handLogout
    }

      

    //cláusula de guardia para toda la pag

    if (isPageLogin === true) {
        return <h3>Validando credenciales</h3>
    }


    return (
        <AuthContext.Provider value={passedContext}>

            {props.children}

        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthWrapper
}