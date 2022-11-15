import dayjs from 'dayjs'
import styles from './ProgressPage.module.css'
import CalendarContext from '../../contexts/CalendarContext'
import { useContext } from 'react';
import { GoalContext } from '../../contexts/GoalContext';
import { DisplayStart } from './DisplayStart';
import { DisplayEnd } from './DisplayEnd'
import { DisplayProgress } from './DisplayProgress';


export const DayProgress = ({ day, rowIndex }) => {

    let { monthIdx } = useContext(CalendarContext);
    const { displayDuration, selectedGoal, dayProgress } = useContext(GoalContext)

    let today = dayjs().format('DD MM YYYY');
    let currDay = dayjs(day).format('DD MM YYYY');

    let displayedYear = dayjs(day).year();
    let currentYear = dayjs().year();

    function getClass(day) {

        if (displayedYear < currentYear) {
            let times = currentYear - displayedYear
            monthIdx += 12 * times
        }

        if (dayjs(day).month() !== Math.abs(monthIdx % 12)) {
            return styles.notCurrentMonth
        } else if (today === currDay) {
            return styles.isToday
        } else {
            return ''
        }
    }
    return (
        <>
            <div className={styles.progressDay}>
                <div>
                    {rowIndex === 0 &&
                        <h5 className={styles.firstRow}>{day.format('dd')}</h5>
                    }
                    <h4 className={getClass(day)}> {day.format('DD')}</h4>
                    {selectedGoal.goal &&
                        <>
                            {dayjs(selectedGoal.createdAt).format('DD MM YYYY') === currDay &&
                                <DisplayStart key={selectedGoal._id} goal={selectedGoal}></DisplayStart>
                            }

                            {!dayProgress ?
                                <>
                                    <h1>...Loading</h1>
                                </>
                                :
                                <>
                                    {dayProgress.map(day => dayjs(day.createdAt).format('DD MM YYYY') === currDay &&
                                        <DisplayProgress key={day._id} day={day}></DisplayProgress>
                                    )
                                    }
                                </>
                            }

                            {dayjs(displayDuration(selectedGoal._id)[0]).format('DD MM YYYY') === currDay &&
                                <DisplayEnd key={selectedGoal._id} goal={selectedGoal} deadline={dayjs(displayDuration(selectedGoal._id)[0])}></DisplayEnd>
                            }
                        </>
                    }
                </div>
            </div>
        </>

    )
}