import express from "express";
import {
  completeToDo,
  createToDo,
  deleteGoalToDos,
  deleteToDo,
  editToDo,
  getCompletedToDos,
  getGoalToDos,
  getIncompletedToDos,
} from "../controllers/toDos.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

router.get("/get/completed/:goalId", verifyToken, getCompletedToDos);
router.get("/get/incompleted/:goalId", verifyToken, getIncompletedToDos);
router.get("/get/:goalId", getGoalToDos);
router.post("/create", verifyToken, createToDo);
router.put("/complete/:toDoId", verifyToken, completeToDo);
router.put("/edit/:toDoId", verifyToken, editToDo);
router.put("/delete/:toDoId", verifyToken, deleteToDo);
router.delete("/deleteall/:goalId", verifyToken, deleteGoalToDos);

export default router;
