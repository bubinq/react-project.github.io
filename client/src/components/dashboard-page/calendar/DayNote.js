import styles from '../Dashboard.module.css'

export const DayNote = ({ goal }) => {

    return (
        <div className={goal.isCompleted ? styles.completedStatus : goal.labelColor}>
            <span className={styles.noteHeader}>{goal.goal}</span>
        </div>
    )
} 