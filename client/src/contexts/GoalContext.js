import dayjs from "dayjs";
import { db } from "../firebase-config";
import { query, where, getDocs, doc } from "firebase/firestore";

import { resetToDo, reset } from "../services/ToDoServices";
import { createContext, useEffect, useReducer, useState } from "react";
import { dayProgressRef } from "../firebase-constants/goalsCollection";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { tomorrowVal, now } from "../components/dashboard-page/calendar/constants/timeConst";


export const GoalContext = createContext()


function goalManager(state, action) {
    switch (action.type) {
        case 'READ':
            return [...action.payload]

        case 'CREATE':
            return [...state, { ...action.payload, id: action.id }]

        case 'TODOCREATE':
            return state.map(oldGoal => oldGoal.id === action.id ?
                {
                    ...action.payload, toDos: [...oldGoal.toDos, action.toDos]
                } : oldGoal)

        case 'UPDATE':
            return state.map(oldGoal => oldGoal.id === action.id ? { ...action.payload, id: action.id } : oldGoal)

        case 'UPDATESTATUS':
            return state.map(oldGoal => oldGoal.id === action.id ? { ...action.payload, isSaved: true } : oldGoal)

        case 'UPDATECOMPLETE':
            return state.map(oldGoal => oldGoal.id === action.id ? { ...action.payload, isExpired: true } : oldGoal)

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
    const initialize = JSON.parse(storage) || []

    return initialize
}

export const GoalProvider = ({ children }) => {
    const [goals, dispatch] = useReducer(goalManager, [], initStorage)
    const [goalStorage, setGoalStorage] = useLocalStorage('goals', [])
    const [isLoading, setIsLoading] = useState(false)
    const [dayInfo, setDayInfo] = useState({});
    const [toDos, setToDos] = useState('')
    const [hasGoals, setHasGoals] = useState(false)
    const [selectedGoal, setSelecetedGoal] = useState({})
    const [dayProgress, setDayProgress] = useState([])
    const [firebaseGoals, setFirebaseGoals] = useState([])

    useEffect(() => {
        setGoalStorage(goals)
        // eslint-disable-next-line
    }, [goals, firebaseGoals, setGoalStorage])


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

    useEffect(() => {
        if (tomorrowVal - 5000 < now) {
            goals.map(goal => {
                return goal.toDos.map(todo => {
                    return Promise.all([resetToDo(doc(db, 'goals', goal.id), todo), reset(doc(db, 'goals', goal.id), todo)])
                })
            })
        }
    }, [goals])



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
                firebaseGoals,
                setFirebaseGoals,
                selectGoalHandler,
                selectedGoal,
                dayProgress,
                setDayProgress,
                resetSelectedGoal
            }}>{children}
        </GoalContext.Provider>
    )
}