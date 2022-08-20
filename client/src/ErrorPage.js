import styles from './ErrorPage.module.css'
import { Link } from 'react-router-dom'

export const ErrorPage = () => {
    return (
        <div className={styles.notFound}>
            <div className={styles.errorWrapper}>
                <h1>Page not found!</h1>
                <Link to="/" className={styles.back}>Go Back</Link>
            </div>
            
        </div>
    )
}