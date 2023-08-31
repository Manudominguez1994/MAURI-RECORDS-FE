import { createContext, useState } from "react";

const AuthContext = createContext()

function AuthWrapper(props) {

    const [ isUserActive, setIsUserActive ] = useState(false)
    const [ activeUserId, setActiveUserId ] = useState(null)

    const verifyToken = async () => {
        try {
            
            const response = await service("/auth/verify")
            console.log(response)

        } catch (error) {
            console.log(error)
            
        }
    }

    const passedContext = {
        verifyToken
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