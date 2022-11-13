import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";

import { GoalContext } from "../../../../contexts/GoalContext";
import styles from "./GoalDetails.module.css";
import ToDoItem from "./ToDoItem";
import { Navigation } from "../../../Navigation";

const GoalDetails = () => {
  //  Displays ToDoItems
  //  filters by status
  //  creates ToDos internally

  const { goals, dispatch } = useContext(GoalContext);
  const { goalId } = useParams();

  const goal = goals.find((theGoal) => theGoal._id === goalId);
  console.log(goals);
  console.log(goal);

  //   useEffect(() => {
  //     const getDetails = async () => {
  //       const goal = await axios.get(`/goals/details/${goalId}`);
  //       setGoal(goal.data);
  //     };
  //     getDetails();
  //     //eslint-disable-next-line
  //   }, []);

  const submitToDo = async (ev) => {
    ev.preventDefault();
    const data = new FormData(ev.target);
    const note = new Array(data.get("addNote").trim());

    const sameName = goal.toDos.find((todo) => todo.toDo === note);
    if (sameName) {
      alert("A to-do item with the same name already exists!");
      ev.target.reset();
      return;
    }

    if (note === "") {
      ev.target.reset();
      return;
    }

    const toDoData = axios.post(
      "/toDos/create",
      {
        goalId: goalId,
        toDos: note.map((todo) =>
          Object.assign({ toDo: todo }, { goalId: goalId })
        ),
      },
      { withCredentials: true }
    );

    dispatch({
      type: "TODOCREATE",
      payload: goal,
      toDos: toDoData.data,
      id: goalId,
    });
    ev.target.reset();
  };

  return (
    <>
      <div className={styles.bodyLayer}>
        <Navigation></Navigation>
        <div className={styles.wrapper}>
          <h1 className={styles.header}>{goal?.goal} - daily tasks</h1>
          <form className={styles.mainForm} onSubmit={submitToDo}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="addNote"
                className={styles.inputs}
                placeholder="Add tasks here"
              />
              <button className={styles.addBtn}>
                <i className="material-icons">&#xe163;</i>
              </button>
            </div>
            <div className={styles.dropdownWrapper}>
              <div className={styles.dropdownInnerWrapper}>
                <span>Filter By</span>
                <select name="filter" className={styles.filtered}>
                  <option value="All">All</option>
                  <option value="Completed">Completed</option>
                  <option value="Incompleted">Incompleted</option>
                </select>
              </div>
            </div>
          </form>
          <div className={styles.notesList}>
            <ol className={styles.notes}>
              {goal?.toDos.map((task) => (
                <ToDoItem key={task._id} goal={goal} todo={task} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalDetails;
