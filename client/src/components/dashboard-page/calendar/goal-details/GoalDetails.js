import { axiosInstance } from "../../../../utils";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { DetailsContext } from "../../../../contexts/detailsContext";
import styles from "./GoalDetails.module.css";
import ToDoItem from "./ToDoItem";
import { Navigation } from "../../../Navigation";

const GoalDetails = () => {
  //  Displays ToDoItems
  //  filters by status
  //  creates ToDos internally

  const { goalDetails, dispatch } = useContext(DetailsContext);
  const { goalId } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      const goal = await axiosInstance.get(`/goals/details/${goalId}`);
      dispatch({
        type: "READ",
        payload: goal.data,
      });
    };
    getDetails();
    //eslint-disable-next-line
  }, []);

  const submitToDo = async (ev) => {
    ev.preventDefault();
    const data = new FormData(ev.target);
    const note = data.get("addNote").trim();

    const sameName = goalDetails.toDos.find((todo) => todo.toDo === note);
    if (sameName) {
      alert("A to-do item with the same name already exists!");
      ev.target.reset();
      return;
    }

    if (note === "") {
      ev.target.reset();
      return;
    }

    const toDoData = await axiosInstance.post(
      "/toDos/create",
      {
        goalId: goalId,
        toDos: new Array(note).map((todo) =>
          Object.assign({ toDo: todo }, { goalId: goalId })
        ),
      },
      { withCredentials: true }
    );

    dispatch({
      type: "READ",
      payload: toDoData.data,
    });
    ev.target.reset();
  };

  const filterBy = async (ev) => {
    ev.preventDefault();
    if (ev.target.value === "Completed") {
      const completedToDos = await axiosInstance.get(
        `/toDos/get/completed/${goalId}`
      );
      dispatch({
        type: "READTODOS",
        payload: completedToDos.data,
      });
    } else if (ev.target.value === "Incompleted") {
      const incompleted = await axiosInstance.get(
        `/toDos/get/incompleted/${goalId}`
      );
      dispatch({
        type: "READTODOS",
        payload: incompleted.data,
      });
    } else {
      const goal = await axiosInstance.get(`/goals/details/${goalId}`);
      dispatch({
        type: "READ",
        payload: goal.data,
      });
    }
  };

  return (
    <>
      <div className={styles.bodyLayer}>
        <Navigation></Navigation>
        <div className={styles.wrapper}>
          <h1 className={styles.header}>{goalDetails?.goal} - daily tasks</h1>
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
                <select
                  name="filter"
                  className={styles.filtered}
                  onChange={filterBy}
                >
                  <option value="All">All</option>
                  <option value="Completed">Completed</option>
                  <option value="Incompleted">Incompleted</option>
                </select>
              </div>
            </div>
          </form>
          <div className={styles.notesList}>
            <ol className={styles.notes}>
              {goalDetails?.toDos?.map((task) => (
                <ToDoItem key={task._id} goal={goalDetails} todo={task} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalDetails;
