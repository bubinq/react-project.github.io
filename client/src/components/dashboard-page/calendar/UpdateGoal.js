import { useContext } from "react"
import dayjs from "dayjs"
import styles from '../Dashboard.module.css'
import CalendarContext from "../../../contexts/CalendarContext"
import { GoalContext } from "../../../contexts/GoalContext"
import Draggable from 'react-draggable';
import { labelsArray } from "./constants/labelConst"

export const UpdateGoal = ({ goalHandler, isUpdating, setSelectedLabel, selectedLabel }) => {


    //  Validates edit form
    //  Updates selected goal


    let { dayTarget, popModalHandler } = useContext(CalendarContext)
    let { dayInfo } = useContext(GoalContext)

    let notes;


    const invalidNotesHandler = (ev) => {
        ev.target.setCustomValidity('List at least one goal-specific area to focus on')
    }

    const validNotesHandler = (ev) => {
        ev.target.setCustomValidity('')
    }

    const selectLabelHandler = (idx) => {
        setSelectedLabel(labelsArray[idx])
    }

    if (dayInfo.toDos.length > 0) {
        let result = []
        notes = dayInfo.toDos.forEach(element => {
            result.push(element.toDo)
        });
        notes = result.join('\n')
    } else {
        notes = ''
    }

    return (
        <Draggable handle="#handle">
            <div className={styles.eventModal}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.eventDay}>{dayjs(dayTarget).format('DD MMMM YYYY')}</h3>
                    <div className={styles.modalClose}>
                        <button onClick={popModalHandler}>&#x2716;</button>
                    </div>
                    <div className={styles.modalDrag}>
                        <button id="handle">&#x268C;</button>
                    </div>
                </div>
                <form onSubmit={goalHandler} className={styles.eventForm}>
                    <input type="text" className={styles.addGoal} name="name" id="name" maxLength={25} placeholder="Enter goal" defaultValue={dayInfo.goal} required></input>

                    <label htmlFor="notes" className={styles.labels}>Make a plan</label>
                    <textarea name="notes" className={styles.notes} id="notes" maxLength={300} placeholder="List your notes each on new line" defaultValue={notes} onInvalid={invalidNotesHandler} onInput={validNotesHandler} required ></textarea>

                    <div className={styles.timeWrapper}>
                        <label htmlFor="time" className={styles.labels}>Set time frame</label>
                        <select name="time" id="time" defaultValue={dayInfo.duration}>
                            <option>1 Year</option>
                            <option>6 Months</option>
                            <option>3 Months</option>
                            <option>1 Month</option>
                            <option>1 Week</option>
                        </select>
                    </div>

                    <label htmlFor="labels">Pick label</label>
                    <div className={styles.labelWrapper} id="labels">
                        {labelsArray.map((label, idx) =>
                            <span key={idx} className={label.color} onClick={() => selectLabelHandler(idx)}>
                                {selectedLabel.color === label.color &&
                                    <button className={styles.checkBox}>&#x2713;</button>
                                }
                            </span>)}
                    </div>


                    <button type="submit" className={styles.submitBtn}>{isUpdating ? "Update" : 'Save'}</button>
                </form>
            </div>
        </Draggable>
    )
}