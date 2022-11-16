import { useContext } from "react";
import CalendarContext from "../../contexts/CalendarContext";
import { GoalContext } from "../../contexts/GoalContext";
import styles from "./ProgressPage.module.css";

export const TrackedGoal = ({ goal }) => {
  const { selectGoalHandler } = useContext(GoalContext);
  const { setShowModal } = useContext(CalendarContext);

  function handleClick() {
    selectGoalHandler(goal);
    setShowModal(false);
    setTimeout(() => {
        let el = document.getElementsByTagName("svg")[0];
        el.scrollIntoView({behavior: "smooth"})
    },300)
  }

  return (
    <div className={styles.trackedGoal} onClick={handleClick}>
      <span className={goal.labelColor}>{goal.goal}</span>
    </div>
  );
};
