import dayjs from 'dayjs'
import styles from './ProgressPage.module.css'

export const DisplayEnd = ({goal, deadline}) => {
    return (
        <div className={`${styles.bubble} ${goal.labelColor}`}>
            <span>{dayjs(deadline).format('DD MM YYYY')}</span>
        </div>
    )
}