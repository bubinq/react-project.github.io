import styles from '../Dashboard.module.css'

export const GoalDeadLine = ({ goal, color, deadline }) => {
    return (
        <div className={`${styles.triangle} ${color}`}>
            <span className={styles.innerText}>{goal.goal} {deadline.format('DD MM')}</span>
        </div>

    )
}