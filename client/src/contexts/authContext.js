import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authUser } from "../firebase-config";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [auth, setAuthUser] = useState()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authUser, (user) => {
            setAuthUser(user)
            localStorage.setItem('authData', JSON.stringify(user))
        })
        return unsubscribe
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log(auth);
    }, [auth])

    return (
        <AuthContext.Provider 
            value={auth}
            >
            {children}
        </AuthContext.Provider>
    )
}