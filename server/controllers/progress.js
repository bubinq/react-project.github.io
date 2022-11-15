import Progress from "../models/progress.js";

export const makeProgress = async (req, res) => {
  try {
    const goalToProg = await Progress.create({
      goalId: req.body.goalId,
      progress: req.body.percentage,
    });
    const savedProg = await goalToProg.save();
    res.status(201).json(savedProg);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getGoalProg = async (req, res) => {
  try {
    const prog = await Progress.find({ goalId: req.params.goalId });
    res.status(201).json(prog);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const deleteProg = async (req, res) => {
  try {
    await Progress.findByIdAndDelete(req.params.progId);
    res.status(201).json({ message: "Progress successfully deleted!" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
