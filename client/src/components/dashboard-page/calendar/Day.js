import dayjs from 'dayjs'
import styles from '../Dashboard.module.css'
import CalendarContext from '../../../contexts/CalendarContext';
import { DayNote } from './DayNote';
import { useContext } from 'react';
import { GoalContext } from '../../../contexts/GoalContext';


export const Day = ({ day, rowIndex }) => {
    let { monthIdx, dayTarget, setDayTarget, setPopModal, popModal } = useContext(CalendarContext);
    let { goals, setHasGoals, setDayInfo, displayDuration, dayInfo } = useContext(GoalContext);


    let today = dayjs().format('DD MM YYYY');
    let selectedDay = dayjs(dayTarget).format('DD MM YYYY');
    let currDay = dayjs(day).format('DD MM YYYY');

    let displayedYear = dayjs(day).year();
    let currentYear = dayjs().year();

    function getClass(day) {
        // console.log(dayInfo)
        // if (dayInfo != {}) {
        //     let fancy = displayDuration(dayInfo.id)
        //     let [end, color] = fancy
        //     let coloreddate = dayjs(end).format('DD MM YYYY')
        //     console.log(coloreddate, color)
        // }

        if (displayedYear < currentYear) {
            let times = currentYear - displayedYear
            monthIdx += 12 * times
        }

        if (dayjs(day).month() !== Math.abs(monthIdx % 12)) {
            return styles.notCurrentMonth
        } else if (today === currDay) {
            return styles.isToday
        } else if (selectedDay === currDay) {
            return popModal ? styles.isSelected : ''
        }
        // } else if (coloreddate === currDay) {
        //     console.log('hey')
        //     return color
        // }
        else {
            return ''
        }
    }

    const selectDayHandler = (day) => {
        setDayTarget(day)
        setPopModal(!popModal)

        const daySelected = dayjs(day).format('DD MM YYYY')
        const matchingDays = Object.assign({}, ...goals.filter(goal => dayjs(goal.createdOn).format('DD MM YYYY') === daySelected))

        if (matchingDays.goal) {
            setDayInfo(matchingDays)
            setHasGoals(true)
        } else {
            setHasGoals(false)
            setDayInfo({ goal: '', duration: '', createdOn: '', toDos: '', labelColor: '', id: '' })
        }

    }

    return (
        <div className={styles.eachDay} onClick={() => selectDayHandler(day)}>
            <div>
                {rowIndex === 0 &&
                    <h5 className={styles.firstRow}>{day.format('dd')}</h5>
                }
                <h4 className={getClass(day)}> {day.format('DD')}</h4>
                {goals.map(goal => dayjs(goal.createdOn).format('DD MM YYYY') === currDay ?
                    <DayNote key={goal.id} goal={goal}></DayNote> : null)}
            </div>
        </div>
    )
}