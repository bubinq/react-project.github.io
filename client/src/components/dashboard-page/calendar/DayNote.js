import styles from '../Dashboard.module.css'

export const DayNote = ({ goal }) => {

    //  Displays the name and styles of each goal as a note on related day

    return (
        <div className={goal.isExpired ? styles.completedStatus : goal.labelColor}>
            <span className={styles.noteHeader}>{goal.goal}</span>
        </div>
    )
} 