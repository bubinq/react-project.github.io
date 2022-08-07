import dayjs from "dayjs";
import { createContext, useEffect, useReducer, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const GoalContext = createContext()


function goalManger(state, action) {
    switch (action.type) {
        case 'CREATE':
            return [...state, { ...action.payload, id: action.id}];

        case 'UPDATE':
            return state.map(oldGoal => oldGoal.id === action.id ? { ...action.payload, id: action.id } : oldGoal)

        case 'DELETE':
            return state.filter(oldGoal => oldGoal.id !== action.id)
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
    const [goals, dispatch] = useReducer(goalManger, [], initStorage)
    const [goalStorage, setGoalStorage] = useLocalStorage('goals', {});
    const [dayInfo, setDayInfo] = useState({});
    const [hasGoals, setHasGoals] = useState(false)

    useEffect(() => {
        setGoalStorage(goals)
    }, [goals, setGoalStorage, dispatch])

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
                setGoalStorage,
                goalStorage,
                displayDuration,
                dayInfo,
                setDayInfo,
                hasGoals,
                setHasGoals
            }}>{children}
        </GoalContext.Provider>
    )
}