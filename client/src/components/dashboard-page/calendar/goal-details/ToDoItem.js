import styles from './GoalDetails.module.css'
import { useContext, useEffect, useState } from 'react'
import { GoalContext } from '../../../../contexts/GoalContext'

const ToDoItem = ({ todo, goal }) => {
    let { dispatch, goals } = useContext(GoalContext)

    const [isCompleted, setIsComplete] = useState(false)

    useEffect(() => {
        if (todo.isCompleted) {
            setIsComplete(!isCompleted)
        }
    }, [goals])


    const completeHandler = () => {
        return dispatch({
            type: "TODOUPDATE",
            payload: goal,
            oldToDos: goal.toDos,
            todo: todo,
            id: goal.id,
        })
    }

    const deleteHandler = () => {
        return dispatch({
            type: "TODODELETE",
            payload: goal,
            oldToDos: goal.toDos,
            todo: todo,
            id: goal.id,
        })
    }
    return (
        <li className={isCompleted ? styles.completed : styles.noteItem}>
            {todo.todo}
            <button className={styles.deleteBtn} onClick={deleteHandler}>Delete</button>
            <button className={styles.completeBtn} onClick={completeHandler}>Complete</button>
        </li>
    )
}
export default ToDoItem;