import { Navigate, Outlet } from "react-router-dom"
import { getAuthData } from "../services/AuthUtils"

export const RouteGuard = () => {
    const authUser = getAuthData()
    if (!authUser) {
        return <Navigate to='/'  replace/>
    }
    return <Outlet/>;
    
}