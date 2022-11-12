import styles from "../Dashboard.module.css";

import { useContext, useState } from "react";
import CalendarContext from "../../../contexts/CalendarContext";
import { GoalContext } from "../../../contexts/GoalContext";
import { UpdateGoal } from "./UpdateGoal";
import { labelsArray } from "./constants/labelConst";
import { GoalModal } from "./GoalModal";

import axios from "axios";

export const EventPopUp = () => {
  //  Tracks each goal data on related day
  //  Manages Crud Operations

  const { popModalHandler, dayTarget } = useContext(CalendarContext);
  const { dispatch, setHasGoals, hasGoals, dayInfo } = useContext(GoalContext);

  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(labelsArray[0]);

  const GoalHandler = async (ev) => {
    ev.preventDefault();

    let isEmpty = false;
    const data = new FormData(ev.target);
    const goalData = {
      goal:
        data.get("name").trim() !== "" ? data.get("name") : (isEmpty = true),
      duration: data.get("time").trim(),
      toDos:
        data.get("notes").trim() !== ""
          ? data.get("notes").trim().split("\n")
          : (isEmpty = true),
      labelColor: selectedLabel.color,
    };

    if (isEmpty) {
      ev.target.reset();
      return;
    }

    if (goalData.toDos.length === 1) {
      goalData.toDos = data.get("notes").trim().split(",");
    }

    if (dayInfo.goal === "") {
      const newGoal = await axios.post(
        "/goals/create",
        {
          goal: goalData.goal,
          duration: goalData.duration,
          labelColor: goalData.labelColor,
          createdAt: dayTarget?.$d,
        },
        { withCredentials: true }
      );
      goalData.toDos.map(async function (todo) {
        await axios.post("/toDos/create", {
          goalId: newGoal.data._id,
          toDo: todo,
        });
      });
      dispatch({
        type: "CREATE",
        payload: newGoal.data,
        _id: newGoal.data._id,
      });
      const getGoals = async () => {
        try {
          const goals = await axios.get("/goals/user");
          dispatch({
            type: "READ",
            payload: goals.data,
          });
        } catch (error) {
          alert(error.response.data.message);
        }
      };
      getGoals();
    } else if (isUpdating) {
      const { toDos, ...data } = goalData;
      const updatedGoal = await axios.put(
        `/goals/update/${dayInfo._id}`,
        {
          ...data,
        },
        { withCredentials: true }
      );
      toDos.map(async function (todo) {
        await axios.put(`/toDos/update/${dayInfo._id}`, {
          toDo: todo,
        });
      });
      dispatch({
        type: "UPDATE",
        payload: updatedGoal.data,
        _id: updatedGoal.data._id,
      });
      const getGoals = async () => {
        try {
          const goals = await axios.get("/goals/user");
          dispatch({
            type: "READ",
            payload: goals.data,
          });
        } catch (error) {
          alert(error.response.data.message);
        }
      };
      getGoals();
    }
    popModalHandler();
  };

  const showUpdateHandler = () => {
    setIsUpdating(true);
    const searchedColor = dayInfo.labelColor.toString();
    const foundIndex = labelsArray.map((x) => x.color).indexOf(searchedColor);

    setSelectedLabel(labelsArray[foundIndex]);
    setHasGoals(false);
  };

  const showDeleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      await axios.delete(`/goals/delete/${dayInfo._id}`);
      dispatch({
        type: "DELETE",
        _id: dayInfo._id,
      });
      popModalHandler();
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={popModalHandler}></div>
      {hasGoals && (
        <GoalModal
          showUpdateHandler={showUpdateHandler}
          showDeleteHandler={showDeleteHandler}
        ></GoalModal>
      )}
      {(!hasGoals || isUpdating) && (
        <UpdateGoal
          goalHandler={GoalHandler}
          isUpdating={isUpdating}
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
        ></UpdateGoal>
      )}
    </>
  );
};
