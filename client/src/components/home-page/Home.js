import './Home.css';
import * as authServices from '../../services/AuthServices'
import { showHideAnimate, headerAnimate } from './Constants';
import { Form } from './Form'

import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { getAuthData, clearAuthData } from '../../services/AuthUtils';

export const Home = () => {

    //  Displays home page with animations
    //  Sets correct Error/Welcoming messages

    const navigateTo = useNavigate()

    const [hasErrors, setErrors] = useState(false)

    const authUser = getAuthData()
    let nickname;
    if (authUser) {
        nickname = authUser.email.split('@')[0]
    }

    const [toggleModal, setToggleModal] = useState(false)

    const checkErrorsHandler = (hasError) => {
        setErrors(hasError)
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
                    animate={{ y: '-34vh', x: '38vw', opacity: 1 }}
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
                        animate={{ x: 0, y: 0, opacity: 1 }}
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
                    <Form toggleModal={toggleModal} toggleModalHandler={toggleModalHandler} checkErrorsHandler={checkErrorsHandler} hasErrors={hasErrors}></Form>
                }


            </div>
            <motion.div
                initial={{ y: '100vh', opacity: 0 }}
                animate={{ y: -30, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="circle two"></div>
            </motion.div>

        </div>
    )
}