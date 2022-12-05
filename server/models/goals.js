import mongoose from "mongoose";
import toDos from "./toDos.js";
import progress from "./progress.js"

const GoalSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      requried: true,
    },
    goal: {
      type: String,
      required: true,
    },
    duration: {
      type: String
    },
    toDos: {
      type: [mongoose.Types.ObjectId],
      ref: "ToDo",
      default: [],
    },
    expiresAt: {
      type: Date,
      requried: true,
    },
    isExpired: {
      type: Boolean,
      default: false,
    },
    isSaved: {
      type: Boolean,
      default: false,
    },
    labelColor: {
      type: String,
      default: "purple",
    },
  },
  { timestamps: true }
);

GoalSchema.pre("deleteOne", async function () {
  const doc = await this.model.findOne(this.getFilter());
  await toDos.deleteMany({ goalId: doc._id });
  await progress.deleteMany({ goalId: doc._id });
});

export default mongoose.model("Goal", GoalSchema);
