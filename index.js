const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(cors({
    origin: process.env.NODE_ENV === "production" ? "" : "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", require("./routes/auth.routes"))
app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource Not Found" })
})
app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).json({ message: "SERVER ERROR", error: error.message })
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("Mongo Connected")
    app.listen(process.env.PORT || 5000, console.log("SERVER RUNNING"))
})