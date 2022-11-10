import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
    goalId: {
        type: mongoose.Types.ObjectId,
        ref: "Goal",
        required: true
    },
    toDo: {
        type: String,
        required: true,
        default: ""
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export default mongoose.model('ToDo', ToDoSchema)