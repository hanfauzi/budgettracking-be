import { Router } from "express";
import { BudgetController } from "./budget.controller";
import { Budget } from "../../generated/prisma/client";
import { validateBody } from "../../middleware/validate.middleware";
import { SetUpdateBudgetDTO } from "./dto/set-update-budget.dto";
import { JwtVerify } from "../../middleware/jwt-verify.middleware";

export class BudgetRouter {
  private budgetController: BudgetController;
  private router: Router;
  constructor() {
    this.budgetController = new BudgetController();
    this.router = Router();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.get(
      "/",
      JwtVerify.verifyToken,
      this.budgetController.getBudget
    );

    this.router.put(
      "/set-update",
      JwtVerify.verifyToken,
      validateBody(SetUpdateBudgetDTO),
      this.budgetController.setUpdateBudget
    );
  }
  getRouter = () => {
    return this.router;
  };
}
