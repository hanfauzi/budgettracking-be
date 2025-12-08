import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.registerUser(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken } = await this.authService.loginUser(req.body);
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
      });
      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  };

  logoutUser = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      res.json({ message: "Logged out" });
    } catch (error) {
      next(error);
    }
  };
}
