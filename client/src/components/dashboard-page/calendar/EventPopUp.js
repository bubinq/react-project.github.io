import styles from '../Dashboard.module.css'

import { useContext, useState } from 'react'
import CalendarContext from '../../../contexts/CalendarContext'
import { GoalContext } from '../../../contexts/GoalContext';
import { UpdateGoal } from './UpdateGoal';
import { labelsArray } from './constants/labelConst';
import { GoalModal } from './GoalModal';
import { v4 as uuidv4 } from 'uuid'
import { getAuthData } from '../../../services/AuthUtils';

import { db } from '../../../firebase-config';
import { goalsCollectionRef, dayProgressRef } from '../../../firebase-constants/goalsCollection';
import { addDoc, updateDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore'

export const EventPopUp = () => {

    //  Tracks each goal data on related day
    //  Manages Crud Operations

    const { popModalHandler, dayTarget } = useContext(CalendarContext)
    const { dispatch, setHasGoals, hasGoals, dayInfo } = useContext(GoalContext)

    const user = getAuthData()

    const [isUpdating, setIsUpdating] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState(labelsArray[0])


    const GoalHandler = (ev) => {
        ev.preventDefault()

        let isEmpty = false;
        const data = new FormData(ev.target)
        const goalData = {
            goal: data.get('name').trim() !== '' ? data.get('name') : isEmpty = true,
            duration: data.get('time').trim(),
            createdOn: new Date(dayTarget).valueOf(),
            toDos: data.get('notes').trim() !== '' ? data.get('notes').trim().split('\n').map(todo => { return { id: uuidv4(), todo: todo, isCompleted: false } }) : isEmpty = true,
            labelColor: selectedLabel.color,
            isSaved: false,
            isExpired: false,
            ownerId: user.id
        }


        if (isEmpty) {
            ev.target.reset()
            return
        }

        if (goalData.toDos.length === 1) {
            goalData.toDos = data.get('notes').trim().split(',').map(todo => { return { id: uuidv4(), todo: todo, isCompleted: false } })
        }

        if (dayInfo.goal === '') {
            (async () => {
                const response = await addDoc(goalsCollectionRef, goalData)
                dispatch({
                    type: 'CREATE',
                    payload: goalData,
                    id: response.id
                })
            })();
        } else if (isUpdating) {
            (async () => {
                const goalDoc = doc(db, "goals", dayInfo.id)
                await updateDoc(goalDoc, goalData)
                dispatch({
                    type: 'UPDATE',
                    payload: goalData,
                    id: dayInfo.id
                })
            })()
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
            (async () => {
                const goalDoc = doc(db, "goals", dayInfo.id)
                await deleteDoc(goalDoc)
                dispatch({
                    type: 'DELETE',
                    id: dayInfo.id
                })
            })()
                .then(() => {
                    const removeProgress = async () => {
                        const q = query(dayProgressRef, where('id', "==", dayInfo.id))
                        const responseData = await getDocs(q)
                        responseData.forEach((document) => {
                            const removeData = async () => {
                                const progressDoc = doc(db, 'progress', document.id)
                                await deleteDoc(progressDoc);
                            }
                            removeData()
                        });
                    }
                    removeProgress()
                })
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