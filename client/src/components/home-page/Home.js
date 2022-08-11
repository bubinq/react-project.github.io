import './Home.css';
import styles from '../dashboard-page/Dashboard.module.css'
import * as authServices from '../../services/AuthServices'
import { v4 as uuidv4 } from 'uuid'
import { showHideAnimate, headerAnimate } from './Constants';
import { LoginModal } from './LoginModal';
import { RegisterModal } from './RegisterModal';
import { Form } from './Form'

import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import dayjs from 'dayjs';

import { GoalContext } from '../../contexts/GoalContext'
import { getAuthData, clearAuthData } from '../../services/AuthUtils';

export const Home = () => {

    const navigateTo = useNavigate()

    const authUser = getAuthData()
    let nickname;
    if (authUser) {
        nickname = authUser.email.split('@')[0]
    }

    let { goals, dispatch } = useContext(GoalContext);

    const [toggleModal, setToggleModal] = useState(false)
    const [hasErrors, setErrors] = useState(false)
    const [View, setView] = useState(() => LoginModal)

    const switchFormHandler = (isLogin) => {
        if (isLogin) {
            setView(() => LoginModal)
        } else {
            setView(() => RegisterModal)
        }

    }

    const condition = toggleModal && !hasErrors;

    const formHandler = (ev) => {
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
            labelColor: styles.purple
        }

        if (!goal.trim()) {
            setErrors(true)
            return;
        }
        dispatch({
            type: 'CREATE',
            payload: goalData,
            id: uuidv4()
        })
        setErrors(false)

    }
    const toggleModalHandler = () => {
        if (!hasErrors) {
            setToggleModal(!toggleModal)
        }
    }


    const logoutHandler = (ev) => {
        ev.preventDefault()

        if (window.confirm('Are you sure you want to logout?')) {
            authServices.get('/logout')
            clearAuthData()
        }
        navigateTo('/')
    }

    return (
        <div className="home">
            <header>
                <div className="logo">
                    <motion.h1
                        variants={headerAnimate}
                        initial='hidden'
                        animate="show"
                    >
                        Organizer
                    </motion.h1>
                </div>
                <motion.nav className="homeNav"
                    variants={headerAnimate}
                    initial='hidden'
                    animate="show"
                >
                    {authUser ?
                        <ul>
                            <Link to="/" onClick={logoutHandler}>Log Out</Link>
                        </ul>
                        :
                        <ul>
                            <Link to="/" onClick={toggleModalHandler}>Log In</Link>
                        </ul>
                    }
                </motion.nav>
                <motion.div
                    initial={{ y: '-100vh', x: '100vw', opacity: 0 }}
                    animate={{ y: '-25vh', x: '40vw', opacity: 1 }}
                    transition={{ duration: .8 }}
                >
                    <div className="circle two"></div>
                </motion.div>
            </header>
            <motion.div
                initial={{ x: "-100vw", y: "-100vh", opacity: 0 }}
                animate={{ x: '0vw', y: "-5vh", opacity: 1 }}
                transition={{ duration: .8 }}
            >
                <div className="circle one"></div>
            </motion.div>
            <div className="content-wrapper">

                <motion.div
                    variants={showHideAnimate}
                    initial='hide'
                    animate='show'
                >
                    <div className="side-text">
                        <h1 className="first-line">Breeze through</h1>
                        <h1 className="second-line">your day-to-day</h1>
                        <h1 className="third-line">tasks more easily.</h1>
                    </div>
                </motion.div>
                {authUser ?
                    <motion.div
                        initial={{ x: "100vw", y: "100vh", opacity: 0 }}
                        animate={{ x: "0vw", y: "0vh", opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="buble action logged">
                            <h1>Hey {nickname},
                                <br></br>
                                It's a lot easier to manage your goals through your dashboard.
                                <br></br>
                            </h1>
                            <Link to='/dashboard'>Go back</Link>
                        </div>
                    </motion.div>
                    :
                    <Form formHandler={formHandler} toggleModalHandler={toggleModalHandler} hasErrors={hasErrors}></Form>
                }


            </div>
            <motion.div
                initial={{ y: "100vh", opacity: 0 }}
                animate={{ y: "15vh", opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="circle two"></div>
            </motion.div>

            {condition &&
                <View showModalHandler={() => toggleModalHandler(toggleModal)} switchHandler={switchFormHandler} />
            }
        </div>
    )
}