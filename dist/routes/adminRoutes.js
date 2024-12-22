"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get("/", authMiddleware_1.isAdmin, adminController_1.adminIndex);
router.get("/delete", authMiddleware_1.isAdmin, adminController_1.deleteUser);
router.get("/add-user", authMiddleware_1.isAdmin, adminController_1.getAddUser);
router.post("/add-user", authMiddleware_1.isAdmin, adminController_1.postAddUser);
router.get("/edit-user", authMiddleware_1.isAdmin, adminController_1.getEditUser);
router.post("/edit-user", authMiddleware_1.isAdmin, adminController_1.postEditUser);
exports.default = router;
