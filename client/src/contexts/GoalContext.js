import dayjs from "dayjs";
import { createContext, useEffect, useReducer, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const GoalContext = createContext()


function goalManager(state, action) {
    switch (action.type) {
        case 'CREATE':
            return [...state, { ...action.payload, id: action.id, onwerId: action.ownerId }];

        case 'TODOCREATE':
            return state.map(oldGoal => oldGoal.id === action.id ?
                {
                    ...action.payload, toDos: [...action.oldToDos,
                    { id: action.todoId, todo: action.todo, isCompleted: false }]
                } : oldGoal)

        case 'UPDATE':
            return state.map(oldGoal => oldGoal.id === action.id ? { ...action.payload, id: action.id } : oldGoal)

        case 'UPDATESTATUS':
            return state.map(oldGoal => oldGoal.id === action.id ? { ...action.payload, isSaved: true } : oldGoal)

        case 'UPDATECOMPLETE':
            return state.map(oldGoal => oldGoal.id === action.id ? { ...action.payload, isCompleted: true } : oldGoal)

        case 'TODOUPDATESTATE':
            return state.map(oldGoal => oldGoal.id === action.id ?
                {
                    ...action.payload, toDos: [...action.oldToDos.map(oldTodo => oldTodo.id === action.todo.id ?
                        { ...action.todo, isCompleted: !action.todo.isCompleted } : oldTodo)]
                } : oldGoal)

        case 'TODOUPDATETEXT':
            return state.map(oldGoal => oldGoal.id === action.id ?
                {
                    ...action.payload, toDos: [...action.oldToDos.map(oldTodo => oldTodo.id === action.todo.id ?
                        { ...action.todo, todo: action.newName } : oldTodo)]
                }
                : oldGoal)

        case 'DELETE':
            return state.filter(oldGoal => oldGoal.id !== action.id)

        case 'TODODELETE':
            return state.map(oldGoal => oldGoal.id === action.id ?
                { ...action.payload, toDos: [...action.oldToDos.filter(oldToDo => oldToDo.id !== action.todo.id)] } : oldGoal)

        default:
            return state;
    }
}

function initStorage() {
    const storage = localStorage.getItem('goals')
    const initializer = storage ? JSON.parse(storage) : []

    return initializer
}

export const GoalProvider = ({ children }) => {
    const [goals, dispatch] = useReducer(goalManager, [], initStorage)
    const [goalStorage, setGoalStorage] = useLocalStorage('goals', {});
    const [dayInfo, setDayInfo] = useState({});
    const [toDos, setToDos] = useState('')
    const [hasGoals, setHasGoals] = useState(false)

    useEffect(() => {
        setGoalStorage(goals)
        console.log(goals)
    }, [goals, setGoalStorage, dispatch])

    useEffect(() => {
        setToDos(toDos)
    }, [toDos, setToDos, goals, dispatch])

    const displayDuration = (goalId) => {

        const searchedGoal = goals.find(target => target.id === goalId)
        if (searchedGoal) {
            const duration = searchedGoal.duration
            const color = searchedGoal.labelColor

            const goalEndPoints = {
                "1 Week": dayjs(searchedGoal.createdOn).add(7, 'day'),
                "1 Month": dayjs(searchedGoal.createdOn).add(1, 'M'),
                "3 Months": dayjs(searchedGoal.createdOn).add(3, 'M'),
                "6 Months": dayjs(searchedGoal.createdOn).add(6, 'M'),
                "1 Year": dayjs(searchedGoal.createdOn).add(1, 'y')
            }

            return [goalEndPoints[duration], color]
        }
    }

    return (
        <GoalContext.Provider
            value={{
                goals,
                dispatch,
                goalStorage,
                setGoalStorage,
                displayDuration,
                dayInfo,
                setDayInfo,
                hasGoals,
                setHasGoals,
                toDos,
                setToDos
            }}>{children}
        </GoalContext.Provider>
    )
}