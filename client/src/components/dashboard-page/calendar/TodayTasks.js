import { Link } from "react-router-dom"
import styles from '../Dashboard.module.css'

export const TodayTasks = ({ goal }) => {

    //  Displays first todo of an goal that is incomplete


    const firstToDo = goal.toDos[0]
    const displayOnlyWhen = goal.isExpired === false && firstToDo
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