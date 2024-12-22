"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect('mongodb://127.0.0.1:27017/week-17');
        console.log('MongoDB connected');
    }
    catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1); // Exit the process if connection fails
    }
};
exports.default = connectDB;
