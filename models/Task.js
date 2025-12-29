import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String},
    status: {type: String, enum: ["todo", "in-progress", "done"], default:"todo"}
}, {timestamps: true});

export default mongoose.model("Task", taskSchema);