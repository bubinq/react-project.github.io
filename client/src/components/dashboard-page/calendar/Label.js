import { Link } from 'react-router-dom'
import styles from '../Dashboard.module.css'

export const Label = ({ goal }) => {

    return (
        <>
            <div className={goal.labelColor}>
                <span>
                    <Link to={`/goals/${goal.id}`} className={styles.goalSpan}>{goal.goal}</Link>
                </span>
            </div>
        </>
    )
}