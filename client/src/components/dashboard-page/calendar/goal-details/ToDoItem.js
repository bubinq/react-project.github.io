import styles from './GoalDetails.module.css'
import { useContext, useEffect, useState } from 'react'
import { GoalContext } from '../../../../contexts/GoalContext'

import { db } from "../../../../firebase-config"
import { doc } from 'firebase/firestore'
import { editToDo, CompleteToDo, deleteToDo, finishCompleted, finishEdited } from '../../../../services/ToDoServices'

const ToDoItem = ({ todo, goal }) => {

    //  Manages CRUD operations
    //  Updates status

    const { dispatch, toDos } = useContext(GoalContext)

    const currentGoal = doc(db, 'goals', goal._id)

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

        const completedTodo = {
            id: todo.id,
            todo: todo.todo,
            isCompleted: !todo.isCompleted
        }

        CompleteToDo(currentGoal, todo)
            .then(() => {
                dispatch({
                    type: "TODODELETE",
                    payload: goal,
                    oldToDos: goal.toDos,
                    todo: todo,
                    id: goal.id,
                })
            }).catch(err => {
                console.log(err.message)
            })
        finishCompleted(currentGoal, todo)
            .then(() => {
                dispatch({
                    type: 'TODOCREATE',
                    payload: goal,
                    toDos: completedTodo,
                    id: goal.id
                })
            }).catch(err => {
                console.log(err.message)
            })
    }

    const deleteHandler = (ev) => {
        const parent = ev.target.parentNode
        parent.style.display = 'none'

        deleteToDo(goal.id, todo)
            .then(() => {
                dispatch({
                    type: "TODODELETE",
                    payload: goal,
                    oldToDos: goal.toDos,
                    todo: todo,
                    id: goal.id,
                })
            })
(false)
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

        const updatedTodo = {
            id: todo.id,
            todo: newText,
            isCompleted: false
        }

        editToDo(todo, currentGoal)
            .then(() => {
                dispatch({
                    type: "TODODELETE",
                    payload: goal,
                    oldToDos: goal.toDos,
                    todo: todo,
                    id: goal.id,
                })
            })
        finishEdited(currentGoal, todo, newText)
            .then(() => {
                dispatch({
                    type: 'TODOCREATE',
                    payload: goal,
                    toDos: updatedTodo,
                    id: goal.id
                })
            })
        setIsClicked(false)
(false)
    }
    return (
        <li className={isCompleted ? styles.completed : styles.noteItem}>
            {todo.toDo}
            <div className={styles.todoWrapper}>
                <form onSubmit={editNameHandler} className={styles.formParent}>
                    {isClicked &&
                        <>
                            <input type='text' name='newText' className={styles.editInput} defaultValue={todo.toDo}></input>
                            <button className={styles.editBtn}>
                                <i className='material-icons'>&#xe163;</i>
                            </button>
                        </>
                    }
                    {!isCompleted &&
                        <span className="material-symbols-outlined" onClick={setClickHandler}>edit</span>
                    }

                </form>
                <button className={styles.completeBtn} onClick={completeHandler}>Complete</button>
                <button className={styles.deleteBtn} onClick={deleteHandler}>Delete</button>
            </div>
        </li>

    )
}
export default ToDoItem;