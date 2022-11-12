import dayjs from "dayjs";
import { db } from "../firebase-config";
import { query, where, getDocs, doc, addDoc } from "firebase/firestore";

import { resetToDo, reset } from "../services/ToDoServices";
import { createContext, useEffect, useReducer, useState } from "react";
import { dayProgressRef } from "../firebase-constants/goalsCollection";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { now } from "../components/dashboard-page/calendar/constants/timeConst";


export const GoalContext = createContext()


function goalManager(state, action) {
    switch (action.type) {
        case 'READ':
            return [...action.payload]

        case 'CREATE':
            return [...state, { ...action.payload, _id: action._id }]

        case 'TODOCREATE':
            return state.map(oldGoal => oldGoal._id === action._id ?
                {
                    ...action.payload, toDos: [...oldGoal.toDos, action.toDos]
                } : oldGoal)

        case 'UPDATE':
            return state.map(oldGoal => oldGoal._id === action._id ? { ...action.payload, _id: action._id } : oldGoal)

        case 'UPDATESTATUS':
            return state.map(oldGoal => oldGoal._id === action._id ? { ...action.payload, isSaved: true } : oldGoal)

        case 'UPDATECOMPLETE':
            return state.map(oldGoal => oldGoal._id === action._id ? { ...action.payload, isExpired: true } : oldGoal)

        case 'DELETE':
            return state.filter(oldGoal => oldGoal._id !== action._id)

        case 'TODODELETE':
            return state.map(oldGoal => oldGoal._id === action._id ?
                { ...action.payload, toDos: [...action.oldToDos.filter(oldToDo => oldToDo._id !== action.todo._id)] } : oldGoal)

        default:
            return state;
    }
}

function initStorage() {
    const storage = localStorage.getItem('goals')
    const initialize = JSON.parse(storage) || []

    return initialize
}

export const GoalProvider = ({ children }) => {
    const [goals, dispatch] = useReducer(goalManager, [], initStorage)
    const [goalStorage, setGoalStorage] = useSessionStorage('goals', [])
    const [isLoading, setIsLoading] = useState(false)
    const [dayInfo, setDayInfo] = useState({});
    const [toDos, setToDos] = useState('')
    const [hasGoals, setHasGoals] = useState(false)
    const [selectedGoal, setSelecetedGoal] = useState({})
    const [dayProgress, setDayProgress] = useState([])
    const [today, setToday] = useState(dayjs(now).date())
    const [dayChanged, setDayChanged] = useState(false)

    useEffect(() => {
        setGoalStorage(goals)
        // eslint-disable-next-line
    }, [goals, setGoalStorage])


    const selectGoalHandler = async (goal) => {
        setDayProgress([])
        setSelecetedGoal(goal)
        const q = query(dayProgressRef, where('id', "==", goal.id))
        const responseData = await getDocs(q)
        responseData.forEach((doc) => {
            setDayProgress(oldProgress => [...oldProgress, doc.data()])
        });
    }

    const resetSelectedGoal = () => {
        setSelecetedGoal({})
    }

    const displayToday = () => {
        if (today !== dayjs(now).date()) {
            console.log('hi');
            setDayChanged(true)
            setToday(dayjs(now).date())
        }
    }

    const displayDuration = (goalId) => {

        const searchedGoal = goals.find(target => target._id === goalId)
        if (searchedGoal) {
            const duration = searchedGoal.duration
            const color = searchedGoal.labelColor

            const goalEndPoints = {
                "1 Week": dayjs(searchedGoal.createdAt).add(7, 'day'),
                "1 Month": dayjs(searchedGoal.createdAt).add(1, 'M'),
                "3 Months": dayjs(searchedGoal.createdAt).add(3, 'M'),
                "6 Months": dayjs(searchedGoal.createdAt).add(6, 'M'),
                "1 Year": dayjs(searchedGoal.createdAt).add(1, 'y')
            }

            return [goalEndPoints[duration], color]
        }
    }

    const calculatePercentage = (goal) => {
        const allToDos = goal.toDos.length
        const oneUnit = 100 / allToDos
        const unitPercentage = Math.round(goal.toDos.filter(todo => todo.isCompleted === true).length * oneUnit)
        return unitPercentage
    }

    useEffect(() => {
        if (dayChanged) {
            goals.map(
                async function makeProgress(goal) {
                    await addDoc(dayProgressRef, { id: goal.id, percentage: calculatePercentage(goal), completedAt: now });
                })
            goals.map(goal => {
                return goal.toDos.map(todo => {
                    return Promise.all([resetToDo(doc(db, 'goals', goal.id), todo), reset(doc(db, 'goals', goal.id), todo)])
                })
            })

        }
    }, [goals, dayChanged])



    return (
        <GoalContext.Provider
            value={{
                goals,
                dispatch,
                displayDuration,
                setGoalStorage,
                goalStorage,
                dayInfo,
                setDayInfo,
                hasGoals,
                setHasGoals,
                toDos,
                setToDos,
                isLoading,
                setIsLoading,
                selectGoalHandler,
                selectedGoal,
                dayProgress,
                setDayProgress,
                resetSelectedGoal,
                displayToday
            }}>{children}
        </GoalContext.Provider>
    )
}