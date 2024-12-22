"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.postEditUser = exports.getEditUser = exports.postAddUser = exports.getAddUser = exports.adminIndex = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const adminIndex = async (req, res) => {
    const users = await userSchema_1.default.find({ role: "user" });
    return res.render("admin", { title: "Admin", users: users });
};
exports.adminIndex = adminIndex;
const getAddUser = async (req, res) => {
    return res.render("addUser", { title: "Add User" });
};
exports.getAddUser = getAddUser;
const postAddUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let hashedPassword = await bcrypt_1.default.hash(password, 10);
        await userSchema_1.default.create({
            email: email,
            username: username,
            password: hashedPassword,
        });
        return res.status(201).json({ message: "Added user successfully" });
    }
    catch (error) {
        console.log("Error Adding user", error);
    }
};
exports.postAddUser = postAddUser;
const getEditUser = async (req, res) => {
    try {
        const userId = req.query.userId;
        const user = await userSchema_1.default.findById(userId);
        res.render("editUser", { title: "Edit User", user: user });
    }
    catch (error) {
        console.log("Error editing user", error);
    }
};
exports.getEditUser = getEditUser;
const postEditUser = async (req, res) => {
    const { userId, email, username, password, role } = req.body;
    try {
        let user = await userSchema_1.default.findById(userId);
        if (user) {
            return res.status(403).json({ error: "Username already taken" });
        }
        let hashedPassword = await bcrypt_1.default.hash(password, 10);
        await userSchema_1.default.updateOne({ _id: userId }, {
            $set: {
                username: username,
                email: email,
                password: hashedPassword,
                role: role,
            },
        });
        return res.status(203).json({ message: "Edited user successfully" });
    }
    catch (error) {
        console.log("Error postEditUser", error);
    }
};
exports.postEditUser = postEditUser;
const deleteUser = async (req, res) => {
    try {
        console.log("hai");
        const userId = req.query.userId;
        console.log(userId);
        await userSchema_1.default.deleteOne({ _id: userId });
        return res.status(204).json({ message: "Deleted User succesfully" });
    }
    catch (error) {
        console.log("Error deleting user", error);
    }
};
exports.deleteUser = deleteUser;
