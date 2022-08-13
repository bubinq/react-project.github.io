import './Home.css';
import dayjs from 'dayjs';
import styles from '../dashboard-page/Dashboard.module.css'
import { v4 as uuidv4 } from 'uuid'

import { motion } from "framer-motion";
import { stepAnimate } from './Constants';
import { useState, useContext } from 'react';

import { LoginModal } from './LoginModal';
import { RegisterModal } from './RegisterModal';
import { GoalContext } from '../../contexts/GoalContext';

export const Form = ({ toggleModal, toggleModalHandler, checkErrorsHandler, hasErrors }) => {

    const { goals, dispatch } = useContext(GoalContext);

    const [View, setView] = useState(() => LoginModal)


    const switchFormHandler = (isLogin) => {
        if (isLogin) {
            setView(() => LoginModal)
        } else {
            setView(() => RegisterModal)
        }
    }

    const condition = toggleModal && !hasErrors;

    const formHandler = async (ev) => {
        ev.preventDefault();
        let data = Object.fromEntries(new FormData(ev.target))
        const { goal, timeFrame } = { ...data }
        const today = new Date(dayjs().format('MM DD YYYY')).valueOf()



        function findNextFreeDate(date) {
            let nextDay = 86400000
            let isTrue = goals.find(goal => goal.createdOn === date)
            if (isTrue) {
                return findNextFreeDate(date + nextDay)
            } else {
                return date
            }
        }

        const goalData = {
            goal,
            duration: timeFrame,
            createdOn: findNextFreeDate(today),
            toDos: [],
            labelColor: styles.purple,
            isSaved: false,
            isCompleted: false
        }

        if (!goal.trim()) {
            checkErrorsHandler(true)
            return;
        }

        dispatch({
            type: 'CREATE',
            payload: goalData,
            id: uuidv4()
        })


        checkErrorsHandler(false)

    }


    return (
        <>
            <form onSubmit={formHandler}>
                <motion.div
                    variants={stepAnimate}
                    initial='hidden'
                    animate='item1'
                >
                    <div className="buble goal">
                        <h3>Step 1:</h3>
                        <label htmlFor="goal">Set goal</label>
                        <input name="goal" type="text" id="goal" placeholder="Ex. Meditate" autoComplete='off' />
                    </div>
                </motion.div>

                <motion.div
                    variants={stepAnimate}
                    initial='hidden'
                    animate='item2'>
                    <div className="buble time">
                        <h3>Step 2:</h3>
                        <label htmlFor="time">Set time frame</label>
                        <select name="timeFrame" id="time">
                            <option>1 Year</option>
                            <option>6 Months</option>
                            <option>3 Months</option>
                            <option>1 Month</option>
                            <option>1 Week</option>
                        </select>
                    </div>
                </motion.div>

                <motion.div
                    variants={stepAnimate}
                    initial='hidden'
                    animate='item3'
                >
                    <div className="buble action">
                        <h3>Step 3:</h3>
                        <button onClick={toggleModalHandler}>Push to start</button>
                        {hasErrors && <h3 className="errorMsg">Please enter a valid input!</h3>}
                    </div>
                </motion.div>
            </form>

            {condition &&
                <View showModalHandler={toggleModalHandler} switchHandler={switchFormHandler} />
            }
        </>
    )
}