"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.postForgotPassword = exports.getForgotPassword = exports.postLogin = exports.getLogin = exports.index = exports.getSignUp = exports.postSignup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const postSignup = async (req, res, next) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res.status(400).json({ error: "All fields must be filled" });
    }
    // Simple password validation: minimum length
    if (password.length < 8) {
        return res
            .status(400)
            .json({ error: "Password must be at least 8 characters long" });
    }
    try {
        const existingUser = await userSchema_1.default.findOne({
            $or: [{ email: email }, { username: username }],
        });
        if (existingUser) {
            return res
                .status(400)
                .json({ error: "Username or email already exists" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await userSchema_1.default.create({
            email: email,
            username: username,
            password: hashedPassword,
            role: "user", // Default to "user" role
        });
        return res.status(200).json({ message: "User signed up successfully" });
    }
    catch (err) {
        console.error("Error creating user", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.postSignup = postSignup;
const getSignUp = (req, res) => {
    return res.render("signup", { title: "Sign Up" });
};
exports.getSignUp = getSignUp;
const index = (req, res) => {
    return res.render("index", { title: "Home", user: req.session?.user });
};
exports.index = index;
const getLogin = (req, res) => {
    return res.render("login", { title: "Login In" });
};
exports.getLogin = getLogin;
const postLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ error: "Username and password are required" });
    }
    try {
        const user = await userSchema_1.default.findOne({ username: username });
        console.log(user);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ error: "Incorrect password" });
        }
        // Set session based on the role
        if (user.role === "admin") {
            req.session.admin = user;
            console.log(user);
            // console.log(user);
            // req.session.user = null;
            return res
                .status(200)
                .json({ message: "Login successful", redirectionURL: "/admin" });
        }
        else {
            req.session.user = user;
            // req.session.admin = null;
            return res
                .status(200)
                .json({ message: "Login successful", redirectionURL: "/" });
        }
    }
    catch (error) {
        console.error("Error logging in", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.postLogin = postLogin;
const getForgotPassword = (req, res) => {
    return res.render("forgot", { title: "Forgot Password" });
};
exports.getForgotPassword = getForgotPassword;
const postForgotPassword = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userSchema_1.default.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.role === "admin") {
            return res
                .status(403)
                .json({ error: "You can't change an admin's password" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await userSchema_1.default.updateOne({ username: username }, { $set: { password: hashedPassword } });
        return res.status(200).json({ message: "Password changed successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.postForgotPassword = postForgotPassword;
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Error destroying session:", err);
            return res.status(500).json({ error: "Failed to log out" });
        }
        res.clearCookie("connect.sid");
        return res.redirect("/login");
    });
};
exports.logout = logout;
