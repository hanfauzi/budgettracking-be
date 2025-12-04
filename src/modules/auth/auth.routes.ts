import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateBody } from "../../middleware/validate.middleware";
import { RegisterDTO } from "./dto/user-register.dto";
import { LoginDTO } from "./dto/user-login.dto";

export class AuthRouter {
  private authController: AuthController;
  private router: Router;
  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.post(
      "/register",
      validateBody(RegisterDTO),
      this.authController.registerUser
    );

    this.router.post(
      "/login",
      validateBody(LoginDTO),
      this.authController.loginUser
    );
  }
  getRouter = () => {
    return this.router;
  };
}
