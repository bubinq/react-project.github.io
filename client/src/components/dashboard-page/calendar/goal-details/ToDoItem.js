import styles from "./GoalDetails.module.css";
import { useContext, useState } from "react";

import { axiosInstance } from "../../../../utils";
import { DetailsContext } from "../../../../contexts/detailsContext";

const ToDoItem = ({ todo, goal }) => {
  //  Manages CRUD operations
  //  Updates status

  const { dispatch } = useContext(DetailsContext);

  const [isClicked, setIsClicked] = useState(false);

  const completeHandler = async () => {
    const completedToDo = await axiosInstance.put(`/toDos/complete/${todo._id}`, {
      goalId: goal._id,
    });

    dispatch({
      type: "READ",
      payload: completedToDo.data,
    });
  };

  const deleteHandler = async (ev) => {
    const parent = ev.target.parentNode;
    parent.style.display = "none";

    const newGoal = await axiosInstance.put(
      `/toDos/delete/${todo._id}`,
      { goalId: goal._id },
      { withCredentials: true }
    );
    dispatch({
      type: "READ",
      payload: newGoal.data,
    });
  };

  const setClickHandler = () => {
    setIsClicked(!isClicked);
  };

  const editNameHandler = async (ev) => {
    ev.preventDefault();
    const data = new FormData(ev.target);
    const newText = data.get("newText").trim();
    if (newText === "") {
      return;
    }
    const sameName = goal.toDos.find((todo) => todo.todo === newText);
    if (sameName) {
      alert("A to-do item with the same name already exists!");
      ev.target.reset();
      return;
    }

    const updatedGoal = await axiosInstance.put(`/toDos/edit/${todo._id}`, {
      goalId: goal._id,
      toDo: newText
    });

    dispatch({
      type: "READ",
      payload: updatedGoal.data,
    });

    setIsClicked(false);
  };
  return (
    <li className={todo.isCompleted ? styles.completed : styles.noteItem}>
      <span>{todo.toDo}</span>
      <div className={styles.todoWrapper}>
        <form onSubmit={editNameHandler} className={styles.formParent}>
          {isClicked && (
            <>
              <input
                type="text"
                name="newText"
                className={styles.editInput}
                defaultValue={todo.toDo}
              ></input>
              <button className={styles.editBtn}>
                <i className="material-icons">&#xe163;</i>
              </button>
            </>
          )}
          {!todo.isCompleted && (
            <span
              className="material-symbols-outlined"
              onClick={setClickHandler}
            >
              edit
            </span>
          )}
        </form>
        <button className={styles.completeBtn} onClick={completeHandler}>
          Complete
        </button>
        <button className={styles.deleteBtn} onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </li>
  );
};
export default ToDoItem;
