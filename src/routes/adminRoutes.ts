import express from "express";
import {
  adminIndex,
  deleteUser,
  getAddUser,
  getEditUser,
  postAddUser,
  postEditUser,
} from "../controllers/adminController";
import { getForgotPassword } from "../controllers/userController";
import { isAdmin } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/", isAdmin, adminIndex);
router.get("/delete", isAdmin, deleteUser);
router.get("/add-user", isAdmin, getAddUser);
router.post("/add-user", isAdmin, postAddUser);
router.get("/edit-user", isAdmin, getEditUser);
router.post("/edit-user", isAdmin, postEditUser);

export default router;
