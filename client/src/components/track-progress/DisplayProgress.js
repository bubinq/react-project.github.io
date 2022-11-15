import styles from './ProgressPage.module.css'

export const DisplayProgress = ({ day }) => {

    let offSet = Math.round(251 - 251 * (day.progress/100))
    return (
        <div className={styles.circle}>
            <svg className={styles.figure}>
                <circle cx='40' cy="40" r="40" strokeDashoffset={offSet} strokeDasharray={251}></circle>
            </svg>
            <span className={styles.middle}>{day.progress}%</span>
        </div>
    )
}