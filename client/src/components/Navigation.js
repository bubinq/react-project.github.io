import { Link, useNavigate } from "react-router-dom"
import { getAuthData, clearAuthData } from '../services/AuthUtils'
import styles from './dashboard-page/Dashboard.module.css'
import * as authServices from '../services/AuthServices'

export const Navigation = () => {
    const authUser = getAuthData()

    const location = window.location.pathname.split('/')[1]

    const navigateTo = useNavigate()


    const logoutHandler = (ev) => {
        ev.preventDefault()

        if (window.confirm('Are you sure you want to logout?')) {
            authServices.get('/logout')
            clearAuthData()
            navigateTo('/')
        } else {
            navigateTo('/dashboard')
        }
    }

    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                {authUser &&
                    <ul>
                        {location === 'goals' &&
                            <Link to="/dashboard" className={styles.navigationLinks}>Dashboard</Link>
                        }
                        <Link to="/dashboard" onClick={logoutHandler} className={styles.navigationLinks}>Log Out</Link>

                    </ul>
                }
            </nav>
        </header>
    )
}