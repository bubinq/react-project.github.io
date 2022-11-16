import { useContext, useState, useEffect } from "react";
import CalendarContext from "../../contexts/CalendarContext";
import { Navigation } from "../Navigation";
import styles from "./ProgressPage.module.css";
import { Header } from "../dashboard-page/calendar/Header";
import { displayMonth } from "../dashboard-page/calendar/Utils";
import { MonthProgress } from "./MonthProgress";
import { EachGoal } from "./EachGoal";
import { GoalContext } from "../../contexts/GoalContext";

export const ProgressPage = () => {
  const { resetSelectedGoal } = useContext(GoalContext);
  const { monthIdx, showModal, setShowModal, checkWidth, setCheckWidth } =
    useContext(CalendarContext);
  const [month, setMonth] = useState(displayMonth());

  useEffect(() => {
    setMonth(displayMonth(monthIdx));
  }, [monthIdx]);

  useEffect(() => {
    resetSelectedGoal();
    // eslint-disable-next-line
  }, []);
  return (
    <div className={styles.progressWrapper}>
      <header className={styles.headerWrapper}>
        <Header></Header>
        <Navigation></Navigation>
      </header>
      <main className={styles.main} style={{justifyContent: showModal? "inherit" : "space-around"}}>
        {showModal && (
          <>
            <div
              className="overlay"
              onClick={() => {
                setShowModal(!showModal);
              }}
            ></div>
            <EachGoal></EachGoal>
          </>
        )}
        {checkWidth > 574 && (
          <EachGoal
            onChange={() => {
              setCheckWidth(window.innerWidth);
            }}
          ></EachGoal>
        )}

        <MonthProgress month={month}></MonthProgress>
      </main>
    </div>
  );
};
