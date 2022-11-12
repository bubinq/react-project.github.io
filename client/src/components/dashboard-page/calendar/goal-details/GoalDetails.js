import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { GoalContext } from "../../../../contexts/GoalContext"
import styles from './GoalDetails.module.css'
// import ToDoItem from "./ToDoItem"
import { Navigation } from "../../../Navigation"
import { CreateTodo } from "../../../../services/ToDoServices"

import { uuidv4 } from "@firebase/util"

const GoalDetails = () => {

    //  Displays ToDoItems
    //  filters by status
    //  creates ToDos internally

    const { dispatch, setToDos } = useContext(GoalContext)
    const { goalId } = useParams()
    const [isFiltering, setIsFiltering] = useState(false)
    const [goal, setGoal] = useState([])

    useEffect(() => {
        const getDetails = async () => {
            const goal = await axios.get(`/goals/details/${goalId}`)
            setGoal(goal.data)
        }
        getDetails()
        //eslint-disable-next-line
    }, [])


    const submitToDo = (ev) => {
        ev.preventDefault()
        const data = new FormData(ev.target)
        const note = data.get('addNote').trim()

        const sameName = goal.toDos.find(todo => todo.todo === note)
        if (sameName) {
            alert('A to-do item with the same name already exists!')
            ev.target.reset()
            return;
        }

        if (note === "") {
            ev.target.reset()
            return
        }

        const id = uuidv4()

        const toDoData = {
            id: id,
            todo: note,
            isCompleted: false
        }

        CreateTodo(goalId, note, id)
            .then(() => {
                dispatch({
                    type: 'TODOCREATE',
                    payload: goal,
                    toDos: toDoData,
                    id: goalId
                })
            })
        setIsFiltering(false)
        ev.target.reset()
    }

    const filterBy = (ev) => {
        setIsFiltering(true)
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
                <Navigation></Navigation>
                <div className={styles.wrapper}>
                    <h1 className={styles.header}>{goal?.goal} - daily tasks</h1>
                    <form className={styles.mainForm} onSubmit={submitToDo}>
                        <div className={styles.inputWrapper}>
                            <input type="text" name="addNote" className={styles.inputs} placeholder="Add tasks here" />
                            <button className={styles.addBtn}>
                                <i className='material-icons'>&#xe163;</i>
                            </button>
                        </div>
                        <div className={styles.dropdownWrapper}>
                            <div className={styles.dropdownInnerWrapper}>
                                <span>Filter By</span>
                                <select name="filter" className={styles.filtered} onChange={filterBy}>
                                    <option value="All">All</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Incompleted">Incompleted</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className={styles.notesList}>
                        <ol className={styles.notes}>
                            {/* {isFiltering ?
                                toDos.map(task => <ToDoItem key={task.id} goal={goal} todo={task} setIsFiltering={setIsFiltering} />)
                                : goal.toDos.map(task => <ToDoItem key={task.id} goal={goal} todo={task} setIsFiltering={setIsFiltering} />)
                            } */}
                        </ol>
                    </div>
                </div>
            </div>


        </>
    )
}

export default GoalDetails;