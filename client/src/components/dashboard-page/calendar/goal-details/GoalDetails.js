import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GoalContext } from "../../../../contexts/GoalContext"
import { v4 as uuidv4 } from 'uuid'
import styles from './GoalDetails.module.css'
import ToDoItem from "./ToDoItem"

export const GoalDetails = () => {
    let { goals, dispatch, setGoalStorage } = useContext(GoalContext)
    const { goalId } = useParams()

    const goal = goals.find(g => g.id === goalId)

    const submitToDo = (ev) => {
        ev.preventDefault()
        const data = new FormData(ev.target)
        const note = data.get('addNote').trim()
        return dispatch({
            type: 'TODOCREATE',
            payload: goal,
            oldToDos: goal.toDos,
            todo: note,
            todoId: uuidv4(),
            id: goal.id
        })
    }

    useEffect(() => {
        setGoalStorage(goals)
    }, [goals, dispatch])

    return (
        <>
            <div className={styles.bodyLayer}>
                <div className={styles.wrapper}>
                    <h1 className={styles.header}>{goal.goal} - daily tasks</h1>
                    <form className={styles.mainForm} onSubmit={submitToDo}>
                        <div className={styles.inputWrapper}>
                            <input type="text" name="addNote" placeholder="Add tasks here" />
                            <button className={styles.addBtn}>
                                <i className={styles.materialIcons}></i>
                            </button>
                        </div>
                        <div className={styles.dropdownWrapper}>
                            <div className={styles.dropdownInnerWrapper}>
                                <span>Sort By</span>
                                <select name="sort" className={styles.filtered}>
                                    <option value="All">All</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Incompleted">Incompleted</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className={styles.notesList}>
                        <ol className={styles.notes}>
                            {goal.toDos.map(task => <ToDoItem key={uuidv4()} goal={goal} todo={task} />)}
                        </ol>
                    </div>
                </div>
            </div>


        </>
    )
}