import styles from "../Dashboard.module.css"
import { useContext } from "react"
import { GoalContext } from "../../../contexts/GoalContext"
import { Label } from "./Label"

export const SideBar = () => {
    const { goals } = useContext(GoalContext)

    return (
        <aside className={styles.sideBar}>
            <div className={styles.legendWrapper}>
                <h1>Today tasks</h1>
                <h1>All goals</h1>
                {goals.map(goal => <Label key={goal.id} goal={goal}></Label>)}
            </div>
            
        </aside>
    )
}