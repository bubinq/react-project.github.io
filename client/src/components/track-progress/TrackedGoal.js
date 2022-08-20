import { useContext } from 'react'
import { GoalContext } from '../../contexts/GoalContext'
import styles from './ProgressPage.module.css'

export const TrackedGoal = ({ goal }) => {

    let { selectGoalHandler } = useContext(GoalContext)

    return (
        <div className={styles.trackedGoal} onClick={() => selectGoalHandler(goal)}>

            <span className={goal.labelColor}>{goal.goal}</span>
        </div>
    )
}