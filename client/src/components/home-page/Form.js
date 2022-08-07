import './Home.css';
import { motion } from "framer-motion";
import { stepAnimate } from './Constants';
export const Form = ({formHandler, toggleModalHandler, hasErrors}) => {
    return (
        <form onSubmit={formHandler}>
            <motion.div
                variants={stepAnimate}
                initial='hidden'
                animate='item1'
            >
                <div className="buble goal">
                    <h3>Step 1:</h3>
                    <label htmlFor="goal">Set goal</label>
                    <input name="goal" type="text" id="goal" placeholder="Ex. Meditate" />
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
    )
}