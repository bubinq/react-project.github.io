import toDo from "../models/toDos.js";
import Goal from "../models/goals.js";

export const getGoalToDos = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.goalId)
      .populate("toDos")
      .select({ toDos: 1 });
    res.status(200).json(goal);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const createToDo = async (req, res) => {
  try {
    const newToDo = await toDo.create({ ...req.body });
    const savedToDo = await newToDo.save();
    const currentGoal = await Goal.findByIdAndUpdate(
      req.body.goalId,
      { $push: { toDos: savedToDo } },
      { new: true }
    );
    res.status(200).json(currentGoal);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const completeToDo = async (req, res) => {
  try {
    const completedToDo = await toDo.findByIdAndUpdate(
      req.params.toDoId,
      { $set: { isCompleted: true } },
      { new: true }
    );
    res.status(200).json(completedToDo);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const editToDo = async (req, res) => {
  try {
    const edited = await toDo.findByIdAndUpdate(
      req.params.toDoId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(edited);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const deleteToDo = async (req, res) => {
  try {
    await toDo.findByIdAndDelete(req.params.toDoId);
    res.status(200).json({ message: "ToDo deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
