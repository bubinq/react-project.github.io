import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GoalContext } from '../../../contexts/GoalContext'
import styles from '../Dashboard.module.css'

export const Label = ({ goal }) => {

    const { setLastSelectedGoal } = useContext(GoalContext)

    const selectDayHandler = () => {
        setLastSelectedGoal(goal)
    }
    return (
        <>
            <div className={goal.labelColor}>
                <span>
                    <Link to={`/goals/${goal.id}`} className={styles.goalSpan} onClick={selectDayHandler}>{goal.goal}</Link>
                </span>
            </div>
        </>
    )
}