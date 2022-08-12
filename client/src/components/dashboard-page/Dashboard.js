import { useContext } from "react"
import { GoalContext } from "../../contexts/GoalContext"
import { Calendar } from "./calendar/Calandar"


export const Dashboard = () => {
    const { goals } = useContext(GoalContext)
    console.log(goals)


    const checkLastGoalValidation = () => {
        const lastAddedGoal = goals[goals.length - 1]
        const alreadyExists = goals.find(goal => goal.goal === lastAddedGoal.goal)

        if (alreadyExists) {

        }
    }
    return (
        <div>
            <Calendar></Calendar>
        </div>
    )
}