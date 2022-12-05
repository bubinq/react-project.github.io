import { useContext, useEffect, useState } from "react";
import { GoalContext } from "../../contexts/GoalContext";
import { Calendar } from "./calendar/Calandar";
import { DashboardPopUp } from "./DashboardPopUp";
import { motion } from "framer-motion";
import dayjs from "dayjs";

import { axiosInstance } from "../../utils";

export const Dashboard = () => {
  //  Much like Calendar wraps the entire dashboard page
  //  Checks if goal is completed  => This logic can be later added to Achievements system
  //  Asks if you want to keep or change goals with same names

  const {
    goals,
    dispatch,
    displayDuration,
    isLoading,
    resetSelectedGoal
  } = useContext(GoalContext);
  const [showPopUp, setShowPopUp] = useState(false);

  const lastAddedGoal = goals[goals.length - 1];
  const today = new Date(dayjs().format("MM DD YYYY")).valueOf();

  useEffect(() => {
    resetSelectedGoal()
    checkLastGoalValidation();
    checkGoalIsExpired();
    // eslint-disable-next-line
  }, [goals]);

  const resetPopUpTimer = () => {
    setTimeout(() => {
      setShowPopUp(false);
    }, 12000);
  };

  const checkGoalIsExpired = () => {
    goals.map(async function checkGoals(goal) {
      const deadline = displayDuration(goal._id)[0];
      const endGoal = new Date(dayjs(deadline).format("MM DD YYYY")).valueOf();
      if (endGoal - today < 0 && !goal.isExpired) {
        const expiredGoal = await axiosInstance.put(`/goals/updateStatus/${goal._id}`);
        dispatch({
          type: "UPDATECOMPLETE",
          payload: expiredGoal.data,
          _id: goal._id,
        });
        return null;
      } else {
        return null;
      }
    });
  };

  const checkLastGoalValidation = () => {
    const alreadyExists = goals.filter(
      (goal) => goal.goal.toUpperCase() === lastAddedGoal.goal.toUpperCase()
    );

    if (alreadyExists.length > 1 && lastAddedGoal.isSaved === false) {
      setShowPopUp(true);
      resetPopUpTimer();
    }
  };

  useEffect(() => {
    const getGoals = async () => {
      try {
        const goals = await axiosInstance.get("/goals/user");
        dispatch({
          type: "READ",
          payload: goals.data,
        });
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    getGoals();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>...Loading</h1>
      ) : (
        <div>
          <Calendar></Calendar>
          {showPopUp && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: -30 }}
            >
              <DashboardPopUp
                lastAddedGoal={lastAddedGoal}
                setShowPopUp={setShowPopUp}
              />
            </motion.div>
          )}
        </div>
      )}
    </>
  );
};
