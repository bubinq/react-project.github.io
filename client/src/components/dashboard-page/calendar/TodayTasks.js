import { Link } from "react-router-dom"
import styles from '../Dashboard.module.css'

export const TodayTasks = ({ goal }) => {
    const firstToDo = goal.toDos[0]
    const displayOnlyWhen = goal.isCompleted === false && firstToDo
    return (
        <div>
            {displayOnlyWhen &&
                <span>
                    <Link to={`/goals/${goal.id}`} className={styles.firstToDo}>{firstToDo.todo}</Link>
                </span>
            }
        </div>
    )
}