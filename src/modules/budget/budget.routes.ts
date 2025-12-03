import { Router } from "express";
import { BudgetController } from "./budget.controller";

export const budgetRouter = Router();
const controller = new BudgetController();

budgetRouter.get("/budget", controller.getBudget);
budgetRouter.put("/budget", controller.updateBudget);
