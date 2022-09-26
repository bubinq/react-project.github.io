import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from "../../services/firebaseAuthServices";
import { ErrorMessage } from "./ErrorMessage";

import { addDoc } from 'firebase/firestore'
import { goalsCollectionRef } from "../../firebase-constants/goalsCollection";


export const RegisterModal = ({ showModalHandler, switchHandler, form }) => {

    const navigate = useNavigate();

    const [isFocused, setFocus] = useState({
        'email': false,
        'password': false
    })


    const [errorMessage, setErrorMessage] = useState('')
    const [isClicked, setIsClicked] = useState(false)

    const showErrorWhen = isClicked && errorMessage


    useEffect(() => {
        return () => {
            setIsClicked(true)
        }

    }, [errorMessage])


    const labelHandler = (ev) => {
        let input = ev.target
        if (input.value.trim()) {
            setFocus(oldFocus => ({ ...oldFocus, [input.name]: true }))
            return;
        }
        setFocus(oldFocus => ({ ...oldFocus, [input.name]: !isFocused[`${input.name}`] }))
    }

    async function registerHandler(ev) {
        ev.preventDefault();

        const {
            email,
            password,
            passwordConfirm
        } = Object.fromEntries(new FormData(ev.target))

        if (password !== passwordConfirm) {
            setErrorMessage('Passwords must match')
            return
        }

        signUp(email.trim(), password.trim())
            .then(res => {
                if (form.goal) {
                    (async () => {
                        await addDoc(goalsCollectionRef, { ...form, ownerId: res.user.uid })
                    })();
                }
                setErrorMessage('')
                navigate('/dashboard')
            }).catch(err => {
                setErrorMessage(err.message)
            })
    }
    return (
        <>
            <div className="overlay" onClick={showModalHandler}></div>
            <div className="modal-content">
                <h3>Create account</h3>
                <div className="text-wrapper">
                    <span>Already have an account?</span>
                    <Link to='/' onClick={() => switchHandler(true)}>Sign in</Link>
                </div>
                {showErrorWhen &&
                    <ErrorMessage message={errorMessage}></ErrorMessage>
                }

                <form onSubmit={registerHandler}>
                    <div className="email-wrapper">
                        <label htmlFor="email" className={isFocused.email ? "focused" : "labels"}>Email</label>
                        <input type="email" name="email" id="email" onBlur={labelHandler} onFocus={labelHandler} autoComplete='off' required />
                    </div>

                    <div className="password-wrapper">
                        <label htmlFor="password" className={isFocused.password ? "focused" : "labels"}>Password</label>
                        <input type="password" name="password" id="password" onBlur={labelHandler} onFocus={labelHandler} required />
                    </div>

                    <div className="password-wrapper">
                        <label htmlFor="password-confirm" className={isFocused.passwordConfirm ? "focused" : "labels"}>Confirm Password</label>
                        <input type="password" name="passwordConfirm" id="password-confirm" onBlur={labelHandler} onFocus={labelHandler} required />
                    </div>

                    <div className="authBtn">
                        <button>Register</button>
                    </div>
                </form>
                <div className="modal-close">
                    <button onClick={showModalHandler}>&#x2716;</button>
                </div>
            </div>
        </>
    )
}