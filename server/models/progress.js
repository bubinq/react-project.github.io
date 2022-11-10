import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
    goalId: {
        type: mongoose.Types.ObjectId,
        ref: "Goal",
        required: true,
    },
    progress: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true})

export default mongoose.model('Progress', ProgressSchema)