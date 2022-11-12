import Draggable from 'react-draggable';
import styles from '../Dashboard.module.css';
import dayjs from 'dayjs';
import { useContext } from 'react';
import CalendarContext from '../../../contexts/CalendarContext';
import { Link } from 'react-router-dom';
import { GoalContext } from '../../../contexts/GoalContext';

export const GoalModal = ({showUpdateHandler, showDeleteHandler}) => {

    //  Displays general information about each goal's options

    let {popModalHandler, dayTarget} = useContext(CalendarContext);
    let {dayInfo} = useContext(GoalContext)

    const closeUpdatingHandler = () => {
        popModalHandler()
    }

    return (
        <Draggable handle="#handle">
            <div className={styles.eventModal}>
                <div className={styles.modalHeader}>
                    <div className={styles.popUpWrapper}>
                        <h3 className={styles.eventDay}>{dayjs(dayTarget).format('DD MMMM YYYY') || dayjs().format('DD MMMM YYYY')}</h3>
                        <div className={styles.modalClose}>
                            <button onClick={popModalHandler}>&#x2716;</button>
                        </div>
                        <div className={styles.modalDrag}>
                            <button id="handle">&#x268C;</button>
                        </div>

                        <h3>Go to my goal's page:
                            <Link key={dayInfo._id} to={`/goals/${dayInfo._id}`} className={styles.links} onClick={closeUpdatingHandler}>{dayInfo.goal}</Link>
                        </h3>
                        <h3>Update Existing One</h3>
                        <button className={styles.updateBtn} onClick={showUpdateHandler}>Update</button>
                        <h3 className={styles.h3Spec}>Or</h3>
                        <button className={styles.deleteBtn} onClick={showDeleteHandler}>Delete</button>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}