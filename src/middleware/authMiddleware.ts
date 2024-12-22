import { Request, Response, NextFunction } from "express";

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.session && req.session.admin) {
    return next();
  }
  res.redirect("/login");
};

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/login");
};
