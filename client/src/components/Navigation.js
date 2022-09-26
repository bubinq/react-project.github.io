import { Link, useNavigate } from "react-router-dom"
import { authUser } from "../firebase-config"
import styles from './dashboard-page/Dashboard.module.css'
import { logout } from "../services/firebaseAuthServices"
import { useContext } from "react"
import { GoalContext } from "../contexts/GoalContext"

export const Navigation = () => {

    const user = authUser.currentUser

    const location = window.location.pathname.split('/')[1]

    const { displayToday } = useContext(GoalContext)

    const navigateTo = useNavigate()


    const logoutHandler = (ev) => {
        ev.preventDefault()

        if (window.confirm('Are you sure you want to logout?')) {
            logout()
                .then((res) => {
                    localStorage.clear()
                    navigateTo('/')
                })
                .catch(err => {
                    alert(err.message)
                })
        } else {
            navigateTo('/dashboard')
        }
    }

    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                {user &&
                    <ul>
                        <Link to="/dashboard" className={styles.welcomeLink}>Welcome, {user.email.split('@')[0]}</Link>
                        {location === 'dashboard' &&
                            <Link to="/progress" className={styles.navigationLinks} onClick={displayToday}>Track Progress</Link>
                        }
                        {location !== 'dashboard' &&
                            <Link to="/dashboard" className={styles.navigationLinks}>Dashboard</Link>
                        }
                        <Link to="/dashboard" onClick={logoutHandler} className={styles.navigationLinks}>Log Out</Link>

                    </ul>
                }
            </nav>
        </header>
    )
}