import express from "express"
import { completeToDo, createToDo, deleteToDo, editToDo, getGoalToDos } from "../controllers/toDos.js"
import { verifyToken } from "../verifyToken.js"
const router = express.Router()

router.get("/get/:goalId", getGoalToDos)
router.post("/create", verifyToken, createToDo)
router.put("/complete/:toDoId", verifyToken, completeToDo)
router.put("/edit/:toDoId", verifyToken, editToDo)
router.delete("/delete/:toDoId", verifyToken, deleteToDo)

export default router