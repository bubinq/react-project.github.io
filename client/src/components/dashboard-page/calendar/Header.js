import styles from "../Dashboard.module.css";
import dayjs from "dayjs";
import CalendarContext from "../../../contexts/CalendarContext";
import { useContext } from "react";

export const Header = () => {
  //  Takes care of displaying current Month and date
  //  Cycles through Calendar Months with back and forward arrows

  const { monthIdx, setMonthIdx, setShowModal, showModal } =
    useContext(CalendarContext);

  const decreaseMonthHandler = () => {
    setMonthIdx(monthIdx - 1);
  };

  const increaseMonthHandler = () => {
    setMonthIdx(monthIdx + 1);
  };

  const resetMonth = () => {
    setMonthIdx(dayjs().month());
  };

  const displayGoalsModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className={styles.monthHeader}>
      <div className={styles.menuWrapper} onClick={displayGoalsModal}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1 className={styles.h1}>
        {dayjs().month(monthIdx).format("MMM YYYY")}
      </h1>
      <button className={styles.headerArrows} onClick={decreaseMonthHandler}>
        &lt;
      </button>
      <button className={styles.headerArrows} onClick={increaseMonthHandler}>
        &gt;
      </button>
      <h1 className={styles.today} onClick={resetMonth}>
        Today {dayjs().format("DD MMM YYYY")}
      </h1>
    </div>
  );
};
