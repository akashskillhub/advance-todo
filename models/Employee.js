const mongoose = require("mongoose")
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    avatar: { type: String, default: "  " },
    team: [{ type: mongoose.Types.ObjectId, ref: "team" }],
}, { timestamps: true })

module.exports = mongoose.model("employee", employeeSchema)