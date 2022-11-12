import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GoalContext } from '../../../contexts/GoalContext'
import styles from '../Dashboard.module.css'

export const Label = ({ goal }) => {

    const { isLoading } = useContext(GoalContext)

    return (
        <>
            {isLoading &&
                <h1>...Loading</h1>
            }
            <div className={goal.isExpired ? styles.completedStatus : goal.labelColor}>
                <span>
                    <Link to={`/goals/${goal._id}`} className={styles.goalSpan}>{goal.goal}</Link>
                </span>
            </div>
        </>
    )
}