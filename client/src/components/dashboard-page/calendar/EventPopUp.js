import styles from "../Dashboard.module.css";
import "../../../App.css";

import { useContext, useState } from "react";
import CalendarContext from "../../../contexts/CalendarContext";
import { GoalContext } from "../../../contexts/GoalContext";
import { UpdateGoal } from "./UpdateGoal";
import { labelsArray } from "./constants/labelConst";
import { GoalModal } from "./GoalModal";

import { axiosInstance } from "../../../utils";

export const EventPopUp = () => {
  //  Tracks each goal data on related day
  //  Manages Crud Operations

  const { popModalHandler, dayTarget } = useContext(CalendarContext);
  const { dispatch, setHasGoals, hasGoals, dayInfo, displayExpireAt } = useContext(GoalContext);

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
          ? data
              .get("notes")
              .trim()
              .split("\n")
              .map((todo) => {
                return { toDo: todo };
              })
          : (isEmpty = true),
      labelColor: selectedLabel.color,
      expiresAt: displayExpireAt(dayTarget?.$d, data.get("time").trim()).$d
    };

    if (isEmpty) {
      ev.target.reset();
      return;
    }

    if (goalData.toDos.length === 1) {
      goalData.toDos = data
        .get("notes")
        .trim()
        .split(",")
        .map((todo) => {
          return { toDo: todo };
        });
    }

    if (dayInfo.goal === "") {
      const newGoal = await axiosInstance.post(
        "/goals/create",
        {
          goal: goalData.goal,
          duration: goalData.duration,
          labelColor: goalData.labelColor,
          createdAt: dayTarget?.$d,
          expiresAt: displayExpireAt(dayTarget?.$d, goalData.duration).$d
        },
        { withCredentials: true }
      );
      const wholeGoal = await axiosInstance.post("/toDos/create", {
        goalId: newGoal.data._id,
        toDos: goalData.toDos.map((todo) =>
          Object.assign(todo, { goalId: newGoal.data._id })
        ),
      });
      dispatch({
        type: "CREATE",
        payload: wholeGoal.data,
        _id: wholeGoal.data._id,
      });
    } else if (isUpdating) {
      const { toDos, ...data } = goalData;
      const updatedGoal = await axiosInstance.put(
        `/goals/update/${dayInfo._id}`,
        {
          ...data,
        },
        { withCredentials: true }
      );
      await axiosInstance.delete(`/toDos/deleteall/${dayInfo._id}`)
      const wholeGoal = await axiosInstance.post("/toDos/create", {
        goalId: updatedGoal.data._id,
        toDos: toDos.map((todo) =>
          Object.assign(todo, { goalId: updatedGoal.data._id })
        ),
      });
      dispatch({
        type: "UPDATE",
        payload: wholeGoal.data,
        _id: wholeGoal.data._id,
      });
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
      await axiosInstance.delete(`/goals/delete/${dayInfo._id}`);
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
