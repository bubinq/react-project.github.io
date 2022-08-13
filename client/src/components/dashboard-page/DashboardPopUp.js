import { useContext, useState } from 'react'
import { GoalContext } from '../../contexts/GoalContext'
import styles from './Dashboard.module.css'

export const DashboardPopUp = ({ lastAddedGoal, setShowPopUp }) => {

    const { dispatch } = useContext(GoalContext)

    const [updatedChanges, setUpdatedChanges] = useState(false)

    const removeGoalHandler = () => {
        dispatch({
            type: 'DELETE',
            id: lastAddedGoal.id
        })
        setUpdatedChanges(true)
        setTimeout(() => {
            setShowPopUp(false)
            setUpdatedChanges(false)
        }, 2000)
    }

    const saveGoalHandler = () => {
        dispatch({
            type: 'UPDATESTATUS',
            payload: lastAddedGoal,
            id: lastAddedGoal.id
        })
        setUpdatedChanges(true)
        setTimeout(() => {
            setShowPopUp(false)
            setUpdatedChanges(false)
        }, 2000)
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