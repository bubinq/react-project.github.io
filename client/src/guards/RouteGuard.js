import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../contexts/authContext";

export const RouteGuard = () => {
    const {auth} = useContext(AuthContext)
    if (!auth) {
        return <Navigate to='/'  replace/>
    }
    return <Outlet/>;
    
}