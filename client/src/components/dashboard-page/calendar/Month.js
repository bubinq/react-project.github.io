import styles from '../Dashboard.module.css'
import { Day } from "./Day";
import { v4 as uuidv4 } from 'uuid'

const Month = ({ month }) => {

    //  Fills the entire calendar with given month

    return (
        <div className={styles.month}>
            {month.map((week, idx) =>
                <div className={styles.weekRow} key={idx}>
                    {week.map(day =>
                        <Day key={uuidv4()} day={day} rowIndex={idx}></Day>
                    )}
                </div>
            )}
        </div>
    )

}

export default Month;