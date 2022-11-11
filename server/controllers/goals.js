import Goal from "../models/goals.js";

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({});
    res.status(200).json(goals);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getUserGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ownerId: req.user.id});
    res.status(200).json(goals);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const addGoal = async (req, res) => {
  try {
    const newGoal = await Goal.create({
      goal: req.body.goal,
      duration: req.body.duration,
      ownerId: req.user.id,
    });
    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.goalId,
      {
        $set: req.body,
        ownerId: req.user.id
      },
      { new: true }
    );
    const savedGoal = await updatedGoal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const searchedGoal = await Goal.findByIdAndUpdate(
      req.params.goalId,
      { $set: { isExpired: true } },
      { new: true }
    );
    res.status(200).json(searchedGoal);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const saveGoal = async (req, res) => {
  try {
    const searchedGoal = await Goal.findByIdAndUpdate(
      req.params.goalId,
      { $set: { isSaved: true } },
      { new: true }
    );
    res.status(200).json(searchedGoal);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const removeGoal = async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.goalId);
    res.status(200).json({ message: "Goal successfully removed!" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
