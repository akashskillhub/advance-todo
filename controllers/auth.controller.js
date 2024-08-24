// register admin
// login admin
// logout admin

// login user
// logout user

const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Admin = require("../models/Admin")
const { checkEmpty } = require("../utils/checkEmpty")
const Employee = require("../models/Employee")

exports.registerAdmin = asyncHandler(async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10)
    await Admin.create({ ...req.body, password: hash })
    res.json({ message: "register success" })
})
exports.loginAdmin = asyncHandler(async (req, res) => {
    const { userName, password } = req.body
    const { isError, error } = checkEmpty({ userName, password })
    if (isError) {
        return res.status(400).json({ message: "All fields required", error })
    }
    const result = await Admin.findOne({
        $or: [
            { email: userName },
            { mobile: userName },
        ]
    })
    if (!result) {
        return res.status(401).json({ message: "Email / Mobile Not Found" })
    }

    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(401).json({ message: "Password Do Not Match" })
    }

    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "7d" })
    res.cookie("admin", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    })
    res.json({
        message: "login Success", result: {
            name: result.name,
            email: result.email,
            mobile: result.mobile,
            _id: result._id,
        }
    })

})
exports.logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie("admin")
    res.json({ message: "Admin Logout Success" })
})
exports.loginUser = asyncHandler(async (req, res) => {
    const { userName, password } = req.body
    const { isError, error } = checkEmpty({ userName, password })
    if (isError) {
        return res.status(400).json({ message: "All fields required", error })
    }
    const result = await Employee.findOne({
        $or: [
            { email: userName },
            { mobile: userName },
        ]
    })
    if (!result) {
        return res.status(401).json({ message: "Email / Mobile Not Found" })
    }

    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(401).json({ message: "Password Do Not Match" })
    }

    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "7d" })
    res.cookie("employee", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    })
    res.json({
        message: "login Success", result: {
            name: result.name,
            email: result.email,
            mobile: result.mobile,
            _id: result._id,
        }
    })
})
exports.logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("employee")
    res.json({ message: "Employee Logout Success" })
})
