import express from "express";
const router = express.Router();
import { deleteProg, getGoalProg, makeProgress } from "../controllers/progress.js";
import { verifyToken } from "../verifyToken.js";

router.get("/get/:goalId", getGoalProg)
router.post("/create", verifyToken, makeProgress);
router.delete("/delete/:progId", verifyToken, deleteProg)

export default router;
