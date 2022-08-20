import { useContext } from "react"
import { GoalContext } from "../../contexts/GoalContext"
import styles from './ProgressPage.module.css'
import { TrackedGoal } from "./TrackedGoal"

export const EachGoal = () => {

    const { goals } = useContext(GoalContext)
    return (
        <aside className={styles.sideBar}>
            <div className={styles.legendWrapper}>
                <h1>Tracked Goals</h1>
                {goals.map(goal => <TrackedGoal key={goal.id} goal={goal}></TrackedGoal>)}
            </div>
        </aside>
    )
}