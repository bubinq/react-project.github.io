import { useContext, useState } from 'react'
import { GoalContext } from '../../contexts/GoalContext'
import styles from './Dashboard.module.css'

import { removeGoal, saveGoal } from '../../services/GoalServices'

export const DashboardPopUp = ({ lastAddedGoal, setShowPopUp }) => {

    const { dispatch } = useContext(GoalContext)

    const [updatedChanges, setUpdatedChanges] = useState(false)

    const removeGoalHandler = () => {
        setUpdatedChanges(true)
        removeGoal(lastAddedGoal.id)
            .then(() => {
                dispatch({
                    type: 'DELETE',
                    id: lastAddedGoal.id
                })
                setShowPopUp(false)
                setUpdatedChanges(false)
            }).catch(err => {
                alert(err.message)
            })
    }

    const saveGoalHandler = () => {
        setUpdatedChanges(true)
        saveGoal(lastAddedGoal.id)
            .then(() => {
                dispatch({
                    type: 'UPDATESTATUS',
                    payload: lastAddedGoal,
                    id: lastAddedGoal.id
                })
                setShowPopUp(false)
                setUpdatedChanges(false)
            }).catch(err => {
                alert(err.message)
            })
    }

    return (
        <>
            {updatedChanges ?
                <div className={styles.dashboardPopUp}>
                    <span className={styles.savingChanges}>Saving Changes..</span>
                </div>
                :
                <div className={styles.dashboardPopUp}>
                    <span className={styles.dashboardMsg}>{lastAddedGoal?.goal} already exists</span>
                    <div className={styles.dashboardBtnsWrapper}>
                        <button className={styles.dashboardBtns} onClick={saveGoalHandler}>Save</button>
                        <button className={styles.dashboardBtns} onClick={removeGoalHandler}>Undo</button>
                    </div>
                </div>
            }

        </>
    )
}