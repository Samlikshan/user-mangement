import express from "express";
import {
  getForgotPassword,
  getLogin,
  getSignUp,
  index,
  logout,
  postForgotPassword,
  postLogin,
  postSignup,
} from "../controllers/userController";
import { isLoggedIn } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/", isLoggedIn, index);
router.get("/signup", getSignUp);
router.post("/signup", postSignup);
router.get("/login", getLogin);
router.post("/login", postLogin);
// router.get("/", index);
router.get("/forgot-password", getForgotPassword);
router.post("/forgot-password", postForgotPassword);
router.get("/logout", logout);

export default router;
