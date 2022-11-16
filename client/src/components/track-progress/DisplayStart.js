import dayjs from 'dayjs'
import styles from './ProgressPage.module.css'

export const DisplayStart = ({goal}) => {
    return (
        <div className={`${styles.bubble} ${goal.labelColor}`}>
            <span>{dayjs(goal.createdAt).format('DD MM YYYY')}</span>
        </div>
    )
}