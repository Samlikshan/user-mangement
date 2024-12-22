import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userSchema";

declare module "express-session" {
  interface SessionData {
    user?: {
      _id: string;
      username: string;
      email: string;
      role: string;
      password: string;
    };
    admin?: {
      _id: string;
      username: string;
      email: string;
      role: string;
      password: string;
    };
  }
}

// Define the user type to make sure we are working with the correct structure
type UserType = {
  _id: string;
  username: string;
  email: string;
  role: string;
  password: string;
};

export const postSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
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
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email: email,
      username: username,
      password: hashedPassword,
      role: "user", // Default to "user" role
    });
    return res.status(200).json({ message: "User signed up successfully" });
  } catch (err) {
    console.error("Error creating user", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getSignUp = (req: Request, res: Response) => {
  return res.render("signup", { title: "Sign Up" });
};

export const index = (req: Request, res: Response) => {
  return res.render("index", { title: "Home", user: req.session?.user });
};

export const getLogin = (req: Request, res: Response) => {
  return res.render("login", { title: "Login In" });
};

export const postLogin = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const user: UserType | null = await User.findOne({ username: username });
    console.log(user)
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
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
    } else {
      req.session.user = user;
      // req.session.admin = null;
      return res
        .status(200)
        .json({ message: "Login successful", redirectionURL: "/" });
    }
  } catch (error) {
    console.error("Error logging in", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getForgotPassword = (req: Request, res: Response) => {
  return res.render("forgot", { title: "Forgot Password" });
};
export const postForgotPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role === "admin") {
      return res
        .status(403)
        .json({ error: "You can't change an admin's password" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      { username: username },
      { $set: { password: hashedPassword } }
    );

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req: Request, res: Response): void => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session:", err);
      return res.status(500).json({ error: "Failed to log out" });
    }

    res.clearCookie("connect.sid");
    return res.redirect("/login");
  });
};
