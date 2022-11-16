import styles from "./ProgressPage.module.css";

export const DisplayProgress = ({ day }) => {
  let offSet = Math.round(251 - 251 * (day.progress / 100));
  return (
    <div className={styles.circle}>
      <svg className={styles.figure}>
        <circle
          cx={window.innerWidth < 574 ? "30" : "40"}
          cy={window.innerWidth < 574 ? "30" : "40"}
          r={window.innerWidth < 574 ? "30" : "40"}
          strokeDashoffset={offSet}
          strokeDasharray={window.innerWidth < 574 ? 201 : 251}
        ></circle>
      </svg>
      <span className={styles.middle}>{day.progress}%</span>
    </div>
  );
};
