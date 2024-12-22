import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userSchema";

export const adminIndex = async (req: Request, res: Response) => {
  const users = await User.find({ role: "user" });
  return res.render("admin", { title: "Admin", users: users });
};

export const getAddUser = async (req: Request, res: Response) => {
  return res.render("addUser", { title: "Add User" });
};

export const postAddUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { username, email, password } = req.body;
  try {
    let hashedPassword: string = await bcrypt.hash(password, 10);
    await User.create({
      email: email,
      username: username,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "Added user successfully" });
  } catch (error) {
    console.log("Error Adding user", error);
  }
};
export const getEditUser = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;
    const user = await User.findById(userId);
    res.render("editUser", { title: "Edit User", user: user });
  } catch (error) {
    console.log("Error editing user", error);
  }
};

export const postEditUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, email, username, password, role } = req.body;
  try {
    let user = await User.findById(userId);
    if (user) {
      return res.status(403).json({ error: "Username already taken" });
    }
    let hashedPassword: string = await bcrypt.hash(password, 10);

    await User.updateOne(
      { _id: userId },
      {
        $set: {
          username: username,
          email: email,
          password: hashedPassword,
          role: role,
        },
      }
    );
    return res.status(203).json({ message: "Edited user successfully" });
  } catch (error) {
    console.log("Error postEditUser", error);
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("hai");
    const userId = req.query.userId;
    console.log(userId);
    await User.deleteOne({ _id: userId });
    return res.status(204).json({ message: "Deleted User succesfully" });
  } catch (error) {
    console.log("Error deleting user", error);
  }
};
