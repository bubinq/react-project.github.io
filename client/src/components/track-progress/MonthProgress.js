import styles from '../dashboard-page/Dashboard.module.css'
import { DayProgress } from './DayProgress'
import { v4 as uuidv4 } from 'uuid'

export const MonthProgress = ({ month }) => {

    return (
        <div className={styles.month}>
            {month.map((week, idx) =>
                <div className={styles.weekRow} key={idx}>
                    {week.map(day =>
                        <DayProgress key={uuidv4()} day={day} rowIndex={idx}></DayProgress>
                    )}
                </div>
            )}
        </div>
    )

}