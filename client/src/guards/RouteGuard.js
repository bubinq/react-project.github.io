import { Navigate, Outlet } from "react-router-dom"
import { authUser } from "../firebase-config"

export const RouteGuard = () => {
    const user = authUser.currentUser
    if (!user) {
        return <Navigate to='/'  replace/>
    }
    return <Outlet/>;
    
}