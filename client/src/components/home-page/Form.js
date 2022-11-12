import "./Home.css";

import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useState } from "react";

import { stepAnimate } from "./Constants";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";

export const Form = ({
  toggleModal,
  toggleModalHandler,
  checkErrorsHandler,
  hasErrors,
}) => {
  //  Controls displaying of correct Auth Modal when form is submitted
  //  Prepares form info and sends it to localStorage

  const [View, setView] = useState(() => LoginModal);
  const [form, setFormData] = useState({});

  const switchFormHandler = (isLogin) => {
    if (isLogin) {
      setView(() => LoginModal);
    } else {
      setView(() => RegisterModal);
    }
  };

  const condition = toggleModal && !hasErrors;

  const formHandler = (ev) => {
    ev.preventDefault();

    let data = new FormData(ev.target);
    const goal = data.get("goal").trim();
    const timeFrame = data.get("timeFrame").trim();

    const goalData = {
      goal: goal,
      duration: timeFrame,
      createdAt: new Date(dayjs().format('MM DD YYYY')).valueOf()
    };

    setFormData({ ...goalData });

    if (!goal) {
      checkErrorsHandler(true);
      return;
    }

    checkErrorsHandler(false);
    ev.target.reset();
  };
  return (
    <>
      <form onSubmit={formHandler}>
        <motion.div variants={stepAnimate} initial="hidden" animate="item1">
          <div className="buble goal">
            <h3>Step 1:</h3>
            <label htmlFor="goal">Set goal</label>
            <input
              name="goal"
              type="text"
              id="goal"
              placeholder="Ex. Meditate"
              autoComplete="off"
              maxLength={25}
            />
          </div>
        </motion.div>

        <motion.div variants={stepAnimate} initial="hidden" animate="item2">
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

        <motion.div variants={stepAnimate} initial="hidden" animate="item3">
          <div className="buble action">
            <h3>Step 3:</h3>
            <button onClick={toggleModalHandler}>Push to start</button>
            {hasErrors && (
              <h3 className="errorMsg">Please enter a valid input!</h3>
            )}
          </div>
        </motion.div>
      </form>

      {condition && (
        <View
          showModalHandler={toggleModalHandler}
          switchHandler={switchFormHandler}
          form={form}
        />
      )}
    </>
  );
};
