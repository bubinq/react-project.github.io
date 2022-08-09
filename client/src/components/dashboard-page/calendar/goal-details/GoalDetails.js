import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { GoalContext } from "../../../../contexts/GoalContext"
import { v4 as uuidv4 } from 'uuid'
import styles from './GoalDetails.module.css'
import ToDoItem from "./ToDoItem"

const GoalDetails = () => {
    const { goals, dispatch, setToDos, toDos } = useContext(GoalContext)
    const { goalId } = useParams()
    const [ isSorting, setIsSorting] = useState(false)

    const goal = goals.find(g => g.id === goalId)

    const submitToDo = (ev) => {
        ev.preventDefault()
        const data = new FormData(ev.target)
        const note = data.get('addNote').trim()

        if (note === "") {
            ev.target.reset()
            return
        }

        dispatch({
            type: 'TODOCREATE',
            payload: goal,
            oldToDos: goal.toDos,
            todo: note,
            todoId: uuidv4(),
            id: goal.id
        })
        setIsSorting(false)
        ev.target.reset()
    }

    const sortBy = (ev) => {
        setIsSorting(true)
        switch (ev.target.value) {
            case "All":
                setToDos(goal.toDos)
                break;

            case "Completed":
                setToDos(goal.toDos.filter(todo => todo.isCompleted === true))
                break;

            case "Incompleted":
                setToDos(goal.toDos.filter(todo => todo.isCompleted === false))
                break;

            default:
                setToDos(goal.toDos)
                break;
        }
    }


    return (
        <>
            <div className={styles.bodyLayer}>
                <div className={styles.wrapper}>
                    <h1 className={styles.header}>{goal.goal} - daily tasks</h1>
                    <form className={styles.mainForm} onSubmit={submitToDo}>
                        <div className={styles.inputWrapper}>
                            <input type="text" name="addNote" placeholder="Add tasks here" />
                            <button className={styles.addBtn}>
                                <i className='material-icons'>&#xe163;</i>
                            </button>
                        </div>
                        <div className={styles.dropdownWrapper}>
                            <div className={styles.dropdownInnerWrapper}>
                                <span>Sort By</span>
                                <select name="sort" className={styles.filtered} onChange={sortBy}>
                                    <option value="All">All</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Incompleted">Incompleted</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className={styles.notesList}>
                        <ol className={styles.notes}>
                            {isSorting ?
                                toDos.map(task => <ToDoItem key={task.id} goal={goal} todo={task} />)
                                : goal.toDos.map(task => <ToDoItem key={task.id} goal={goal} todo={task} />)
                            }
                        </ol>
                    </div>
                </div>
            </div>


        </>
    )
}

export default GoalDetails;