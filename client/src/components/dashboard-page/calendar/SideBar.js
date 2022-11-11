import styles from "../Dashboard.module.css"
import { useContext } from "react"
import { GoalContext } from "../../../contexts/GoalContext"
import { Label } from "./Label"
import { TodayTasks } from "./TodayTasks"

export const SideBar = () => {

    const { goals, isLoading } = useContext(GoalContext)

    return (
        <>
            {isLoading &&
                <h1>...Loading</h1>
            }
            <aside className={styles.sideBar}>
                <div className={styles.todayTasks}>
                    <h1>Today tasks</h1>
                    {goals.map((goal, idx) => goal.isExpired === false && idx < 3 ? <TodayTasks key={goal._id} goal={goal}></TodayTasks> : null)}
                </div>
                <div className={styles.legendWrapper}>
                    <h1>All goals</h1>
                    {goals.map(goal => <Label key={goal._id} goal={goal}></Label>)}
                </div>
            </aside>
        </>
    )
}