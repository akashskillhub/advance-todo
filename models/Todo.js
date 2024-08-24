const mongoose = require("mongoose")
const todoSchema = new mongoose.Schema({
    task: { type: String, required: true },
    desc: { type: String, required: true },
    dueDate: { type: Date, required: true },
    team: { type: mongoose.Types.ObjectId, ref: "team" },
    employee: { type: mongoose.Types.ObjectId, ref: "employee" },
    isComplete: { type: Boolean, default: false },
    completeOn: { type: Date },
    completedBy: { type: mongoose.Types.ObjectId, ref: "employee" },
}, { timestamps: true })

module.exports = mongoose.model("todo", todoSchema)