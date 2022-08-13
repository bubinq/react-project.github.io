import { useContext, useEffect, useState } from "react"
import { GoalContext } from "../../contexts/GoalContext"
import { Calendar } from "./calendar/Calandar"
import { DashboardPopUp } from "./DashboardPopUp"
import { motion } from "framer-motion"
import dayjs from "dayjs"


export const Dashboard = () => {

    //  Much like Calendar wraps the entire dashboard page
    //  Checks if goal is completed  => This logic can be later added to Achievements system
    //  Asks if you want to keep or change goals with same names


    const { goals, dispatch, displayDuration } = useContext(GoalContext)
    const [showPopUp, setShowPopUp] = useState(false)

    const lastAddedGoal = goals[goals.length - 1]
    const today = new Date(dayjs().format('MM DD YYYY')).valueOf()

    useEffect(() => {
        checkLastGoalValidation()
        checkGoalIsCompleted()
        // eslint-disable-next-line
    }, [goals])

    const resetPopUpTimer = () => {
        setTimeout(() => {
            setShowPopUp(false)
        }, 12000)
    }

    const checkGoalIsCompleted = () => {
        goals.map(function checkGoals(goal) {
            const deadline = displayDuration(goal.id)[0]
            const endGoal = new Date(dayjs(deadline).format('MM DD YYYY')).valueOf()
            if (endGoal - today < 0 && !goal.isCompleted) {

                return dispatch({
                    type: 'UPDATECOMPLETE',
                    payload: goal,
                    id: goal.id
                })

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
    return (
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
    )
}