import { useContext, useEffect, useState } from "react"
import { GoalContext } from "../../contexts/GoalContext"
import { Calendar } from "./calendar/Calandar"
import { DashboardPopUp } from "./DashboardPopUp"
import { motion } from "framer-motion"
import dayjs from "dayjs"

import { authUser } from "../../firebase-config"
import { updateGoalStatus, getGoals } from "../../services/GoalServices"

export const Dashboard = () => {

    //  Much like Calendar wraps the entire dashboard page
    //  Checks if goal is completed  => This logic can be later added to Achievements system
    //  Asks if you want to keep or change goals with same names


    const { goals, dispatch, displayDuration, isLoading, setFirebaseGoals, setDayProgress, resetSelectedGoal } = useContext(GoalContext)
    const [showPopUp, setShowPopUp] = useState(false)

    const lastAddedGoal = goals[goals.length - 1]
    const today = new Date(dayjs().format('MM DD YYYY')).valueOf()

    useEffect(() => {
        checkLastGoalValidation()
        checkGoalIsExpired()
        setDayProgress([])
        resetSelectedGoal()
        // eslint-disable-next-line
    }, [goals])

    const resetPopUpTimer = () => {
        setTimeout(() => {
            setShowPopUp(false)
        }, 12000)
    }

    const checkGoalIsExpired = () => {
        goals.map(function checkGoals(goal) {
            const deadline = displayDuration(goal.id)[0]
            const endGoal = new Date(dayjs(deadline).format('MM DD YYYY')).valueOf()
            if (endGoal - today < 0 && !goal.isExpired) {
                updateGoalStatus(goal.id)
                    .then(() => {
                        return dispatch({
                            type: 'UPDATECOMPLETE',
                            payload: goal,
                            id: goal.id
                        })
                    })
                return null
            }
            else {
                return null;
            }
        })

    }

    const checkLastGoalValidation = () => {
        const alreadyExists = goals.filter(goal => goal.goal.toUpperCase() === lastAddedGoal.goal.toUpperCase())

        if (alreadyExists.length > 1 && lastAddedGoal.isSaved === false) {
            setShowPopUp(true)
            resetPopUpTimer()
        }

    }

    useEffect(() => {
        getGoals()
            .then((data) => {
                const loadedData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
                const user = authUser.currentUser
                const userGoals = loadedData.filter(goal => goal.ownerId === user.uid)
                setFirebaseGoals(loadedData)
                return dispatch({
                    type: 'READ',
                    payload: userGoals
                })
            })
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {isLoading ?
                <h1>...Loading</h1>
                :
                <div>
                    <Calendar></Calendar>
                    {showPopUp &&
                        <motion.div
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: -30 }}
                        >
                            <DashboardPopUp lastAddedGoal={lastAddedGoal} setShowPopUp={setShowPopUp} />
                        </motion.div>
                    }
                </div>
            }
        </>
    )
}