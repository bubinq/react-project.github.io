import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        requried: true
    },
    goal: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    toDos: {
        type: [mongoose.Types.ObjectId],
        ref: "ToDo",
        default: []
    },
    isExpired: {
        type: Boolean,
        default: false
    },
    isSaved: {
        type: Boolean,
        default: false
    },
    labelColor: {
        type: String,
        default: "Dashboard_purple__vFljD"
    }
}, {timestamps: true})

export default mongoose.model('Goal', GoalSchema)