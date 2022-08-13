import styles from '../Dashboard.module.css'
import { v4 as uuidv4 } from 'uuid'

import { useContext, useState } from 'react'
import CalendarContext from '../../../contexts/CalendarContext'
import { GoalContext } from '../../../contexts/GoalContext';
import { UpdateGoal } from './UpdateGoal';
import { labelsArray } from './constants/labelConst';
import { GoalModal } from './GoalModal';

export const EventPopUp = () => {

    //  Tracks each goal data on related day
    //  Manages Crud Operations

    let { popModalHandler, dayTarget } = useContext(CalendarContext)
    let { dispatch, setHasGoals, hasGoals, dayInfo } = useContext(GoalContext)


    const [isUpdating, setIsUpdating] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState(labelsArray[0])

    function dispatchHandler(type, options) {
        if (type !== 'CREATE') {
            return dispatch({
                type: type,
                payload: options.payload,
                id: options.id,
            })
        }
        return dispatch({
            type: type,
            payload: options.payload,
            id: uuidv4()
        })

    }

    const GoalHandler = (ev) => {
        ev.preventDefault()

        let isEmpty = false;
        const data = new FormData(ev.target)
        const goalData = {
            goal: data.get('name').trim() !== ''? data.get('name') : isEmpty = true,
            duration: data.get('time').trim(),
            createdOn: new Date(dayTarget).valueOf(),
            toDos: data.get('notes').trim() !== ''? data.get('notes').trim().split('\n').map(todo => {return {id: uuidv4(), todo: todo, isCompleted: false}}) : isEmpty = true,
            labelColor: selectedLabel.color,
            isSaved: false,
            isCompleted: false
        }


        if(isEmpty) {
            ev.target.reset()
            return
        }

        if(goalData.toDos.length === 1) {
            goalData.toDos = data.get('notes').trim().split(',').map(todo => {return {todo: todo, isCompleted: false}})
        }

        if (dayInfo.goal === '') {
            dispatchHandler('CREATE', { payload: goalData, id: uuidv4()})
        } else if (isUpdating) {
            dispatchHandler('UPDATE', { payload: goalData, id: dayInfo.id})
        }
        popModalHandler()

    }

    const showUpdateHandler = () => {
        setIsUpdating(true)
        const searchedColor = dayInfo.labelColor.toString()
        const foundIndex = labelsArray.map(x => x.color).indexOf(searchedColor)

        setSelectedLabel(labelsArray[foundIndex])
        setHasGoals(false)
    }

    const showDeleteHandler = () => {
        if (window.confirm('Are you sure you want to delete this goal?')) {
            dispatchHandler('DELETE', { id: dayInfo.id })
            popModalHandler()
        }

    }

    return (
        <>
            <div className={styles.overlay} onClick={popModalHandler}></div>
            {hasGoals &&

                <GoalModal showUpdateHandler={showUpdateHandler} showDeleteHandler={showDeleteHandler}></GoalModal>
            }
            {(!hasGoals || isUpdating) &&

                <UpdateGoal goalHandler={GoalHandler} isUpdating={isUpdating} selectedLabel={selectedLabel} setSelectedLabel={setSelectedLabel}></UpdateGoal>
            }

        </>

    )
}