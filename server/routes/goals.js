import express from "express";

import { addGoal, getGoalDetails, getGoals, getUserGoals, removeGoal, saveGoal, updateGoal, updateStatus } from "../controllers/goals.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

router.get("/", getGoals)
router.get("/details/:goalId", verifyToken, getGoalDetails)
router.get("/user", verifyToken, getUserGoals)
router.post("/create", verifyToken, addGoal);
router.put("/update/:goalId", verifyToken, updateGoal)
router.put("/updateStatus/:goalId", verifyToken, updateStatus)
router.put("/saveGoal/:goalId", verifyToken, saveGoal)
router.delete("/delete/:goalId", verifyToken, removeGoal)

export default router;
