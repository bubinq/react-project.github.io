import { useContext } from "react"
import { GoalContext } from "../../contexts/GoalContext"
import styles from './ProgressPage.module.css'
import { TrackedGoal } from "./TrackedGoal"

export const EachGoal = () => {

    const { goals } = useContext(GoalContext)
    const notExpired = goals.filter(goal => goal.isExpired === false)
    const expired = goals.filter(goal => goal.isExpired === true)
    return (
        <aside className={styles.sideBar}>
            <div className={styles.legendWrapper}>
                <h1>Tracked Goals</h1>
                {notExpired.map(goal => <TrackedGoal key={goal.id} goal={goal}></TrackedGoal>)}
                <h1>Expired Goals</h1>
                {expired.map(goal => <TrackedGoal key={goal.id} goal={goal}></TrackedGoal>)}
            </div>
        </aside>
    )
}