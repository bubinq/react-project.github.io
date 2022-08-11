import dayjs from 'dayjs'
import styles from '../Dashboard.module.css'
import CalendarContext from '../../../contexts/CalendarContext';
import { DayNote } from './DayNote';
import { useContext } from 'react';
import { GoalContext } from '../../../contexts/GoalContext';
import { GoalDeadLine } from './GoalDeadLine';


export const Day = ({ day, rowIndex }) => {
    let { monthIdx, dayTarget, setDayTarget, setPopModal, popModal } = useContext(CalendarContext);
    let { goals, setHasGoals, setDayInfo, displayDuration } = useContext(GoalContext);


    let today = dayjs().format('DD MM YYYY');
    let selectedDay = dayjs(dayTarget).format('DD MM YYYY');
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
        } else if (selectedDay === currDay) {
            return popModal ? styles.isSelected : ''
        } else {
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
                    <DayNote key={goal.id} goal={goal}></DayNote> : null)
                }

                {goals.map(goal => dayjs(displayDuration(goal.id)[0]).format('DD MM YYYY') === currDay ?
                    <GoalDeadLine key={goal.id} goal={goal} color={displayDuration(goal.id)[1]} deadline={displayDuration(goal.id)[0]}></GoalDeadLine> : null)
                }
            </div>
        </div>
    )
}