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
    const toDos = await toDo.insertMany(req.body.toDos);
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.body.goalId,
      { $push: { toDos: toDos } },
      { new: true }
    ).populate("toDos");
    res.status(200).json(updatedGoal);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const completeToDo = async (req, res) => {
  const searchedToDo = await toDo.findById(req.params.toDoId);
  try {
    await toDo.findByIdAndUpdate(
      req.params.toDoId,
      { $set: { isCompleted: !searchedToDo.isCompleted } },
      { new: true }
    );
    const updatedGoal = await Goal.findById(req.body.goalId).populate("toDos");
    res.status(200).json(updatedGoal);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const editToDo = async (req, res) => {
  try {
    await toDo.findByIdAndUpdate(
      req.params.toDoId,
      { $set: { toDo: req.body.toDo } },
      { new: true }
    );
    const updatedGoal = await Goal.findById(req.body.goalId).populate("toDos");
    res.status(200).json(updatedGoal);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const deleteToDo = async (req, res) => {
  try {
    await toDo.findByIdAndDelete(req.params.toDoId);
    const updatedGoal = await Goal.findById(req.body.goalId).populate("toDos");
    res.status(200).json(updatedGoal);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const deleteGoalToDos = async (req, res) => {
  try {
    await toDo.deleteMany({ goalId: req.params.goalId });
    res.status(200).json({ message: "ToDos successfully deleted!" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getCompletedToDos = async (req, res) => {
  try {
    const completed = await toDo.find({
      goalId: req.params.goalId,
      isCompleted: true
    });
    res.status(200).json(completed);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getIncompletedToDos = async (req, res) => {
  try {
    const incompleted = await toDo.find({
      goalId: req.params.goalId,
      isCompleted: false
    });
    res.status(200).json(incompleted);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
