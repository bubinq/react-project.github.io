import CalendarContext from '../../../contexts/CalendarContext'
import styles from '../Dashboard.module.css'
import { useContext } from 'react'
import dayjs from 'dayjs'

export const GoalDeadLine = ({ goal, color, deadline }) => {

    //  Keeps track of each goal's deadlines and displays them in the form of a bubble on top of end date

    const { setMonthIdx } = useContext(CalendarContext)

    const returnToGoal = (ev) => {
        ev.stopPropagation();
        setMonthIdx(dayjs(goal.createdOn).month())
    }
    return (
        <div className={goal.isExpired ? `${styles.deadlineBubble} ${styles.completedStatus}` : `${styles.deadlineBubble} ${color}` } onClick = { returnToGoal } >
            <span className={styles.innerText}>{goal.goal} {deadline.format('DD MM')}</span>
        </div >

    )
}