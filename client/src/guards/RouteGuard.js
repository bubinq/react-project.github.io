import { Navigate, Outlet } from "react-router-dom"

export const RouteGuard = () => {
    const user = JSON.parse(localStorage.getItem('authData'))
    if (!user) {
        return <Navigate to='/'  replace/>
    }
    return <Outlet/>;
    
}