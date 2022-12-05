import { useContext, useState } from "react";
import { GoalContext } from "../../contexts/GoalContext";
import styles from "./Dashboard.module.css";

import { axiosInstance } from "../../utils";

export const DashboardPopUp = ({ lastAddedGoal, setShowPopUp }) => {
  const { dispatch } = useContext(GoalContext);

  const [updatedChanges, setUpdatedChanges] = useState(false);

  const removeGoalHandler = async () => {
    setUpdatedChanges(true);
    await axiosInstance.delete(`/goals/delete/${lastAddedGoal._id}`);
    dispatch({
      type: "DELETE",
      _id: lastAddedGoal._id,
    });
    setShowPopUp(false);
    setUpdatedChanges(false);
  };

  const saveGoalHandler = async () => {
    setUpdatedChanges(true);
    await axiosInstance.put(`/goals/saveGoal/${lastAddedGoal._id}`);
    dispatch({
      type: "UPDATESTATUS",
      payload: lastAddedGoal,
      _id: lastAddedGoal._id,
    });
    setShowPopUp(false);
    setUpdatedChanges(false);
  };

  return (
    <>
      {updatedChanges ? (
        <div className={styles.dashboardPopUp}>
          <span className={styles.savingChanges}>Saving Changes..</span>
        </div>
      ) : (
        <div className={styles.dashboardPopUp}>
          <span className={styles.dashboardMsg}>
            {lastAddedGoal?.goal} already exists
          </span>
          <div className={styles.dashboardBtnsWrapper}>
            <button className={styles.dashboardBtns} onClick={saveGoalHandler}>
              Save
            </button>
            <button
              className={styles.dashboardBtns}
              onClick={removeGoalHandler}
            >
              Undo
            </button>
          </div>
        </div>
      )}
    </>
  );
};
