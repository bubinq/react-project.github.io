import styles from './GoalDetails.module.css'
import { useContext, useEffect, useState } from 'react'
import { GoalContext } from '../../../../contexts/GoalContext'

const ToDoItem = ({ todo, goal, sortHandler }) => {
    let { dispatch, toDos } = useContext(GoalContext)

    const [isCompleted, setIsComplete] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
        if (todo.isCompleted) {
            setIsComplete(true)
        } else {
            setIsComplete(false)
        }// eslint-disable-next-line
    }, [toDos])


    const completeHandler = () => {
        setIsComplete(!isCompleted)
        dispatch({
            type: "TODOUPDATESTATE",
            payload: goal,
            oldToDos: goal.toDos,
            todo: todo,
            id: goal.id,
        })
    }

    const deleteHandler = (ev) => {
        const parent = ev.target.parentNode
        parent.style.display = 'none'
        dispatch({
            type: "TODODELETE",
            payload: goal,
            oldToDos: goal.toDos,
            todo: todo,
            id: goal.id,
        })
    }
    const setClickHandler = () => {
        setIsClicked(!isClicked);
    }
    const editNameHandler = (ev) => {
        ev.preventDefault();
        const data = new FormData(ev.target);
        const newText = data.get('newText').trim();
        if (newText === '') {
            return;
        }
        const sameName = goal.toDos.find(todo => todo.todo === newText)
        if (sameName) {
            alert('A to-do item with the same name already exists!')
            ev.target.reset()
            return;
        }

        dispatch({
            type: "TODOUPDATETEXT",
            payload: goal,
            oldToDos: goal.toDos,
            todo: todo,
            id: goal.id,
            newName: newText
        })
        setIsClicked(false)
        sortHandler()
    }
    return (
        <li className={isCompleted ? styles.completed : styles.noteItem}>
            {todo.todo}
            <div className={styles.todoWrapper}>
                <form onSubmit={editNameHandler}>
                    {isClicked &&
                        <>
                            <input type='text' name='newText' className={styles.editInput} defaultValue={todo.todo}></input>
                            <button className={styles.editBtn}>
                                <i className='material-icons'>&#xe163;</i>
                            </button>
                        </>
                    }
                    <span className="material-symbols-outlined" onClick={setClickHandler}>edit</span>
                </form>
                <button className={styles.completeBtn} onClick={completeHandler}>Complete</button>
                <button className={styles.deleteBtn} onClick={deleteHandler}>Delete</button>
            </div>
        </li>

    )
}
export default ToDoItem;