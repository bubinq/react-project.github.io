import { useContext, useState, useEffect } from "react"
import CalendarContext from '../../contexts/CalendarContext'
import { Navigation } from "../Navigation"
import styles from './ProgressPage.module.css'
import { Header } from "../dashboard-page/calendar/Header"
import { displayMonth } from "../dashboard-page/calendar/Utils"
import { MonthProgress } from "./MonthProgress"
import { EachGoal } from "./EachGoal"
import { GoalContext } from "../../contexts/GoalContext"

export const ProgressPage = () => {

    const { setDayProgress, resetSelectedGoal } = useContext(GoalContext)
    const { monthIdx } = useContext(CalendarContext)
    const [month, setMonth] = useState(displayMonth());

    useEffect(() => {
        setMonth(displayMonth(monthIdx))
    }, [monthIdx])

    useEffect(() => {
        setDayProgress([])
        resetSelectedGoal()
        // eslint-disable-next-line
    }, [])
    return (
        <div className={styles.progressWrapper}>
            <header className={styles.headerWrapper}>
                <Header></Header>
                <Navigation></Navigation>
            </header>
            <main className={styles.main}>
                <EachGoal></EachGoal>
                <MonthProgress month={month}></MonthProgress>
            </main>
        </div>
    )
}