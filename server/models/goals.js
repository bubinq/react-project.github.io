import mongoose from "mongoose";
import toDos from "./toDos.js";

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
      type: String,
      required: true,
    },
    toDos: {
      type: [mongoose.Types.ObjectId],
      ref: "ToDo",
      default: [],
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
      default: "Dashboard_purple__vFljD",
    },
  },
  { timestamps: true }
);

GoalSchema.pre("deleteOne", async function () {
  const doc = await this.model.findOne(this.getFilter());
  await toDos.deleteMany({ goalId: doc._id });
});

export default mongoose.model("Goal", GoalSchema);
