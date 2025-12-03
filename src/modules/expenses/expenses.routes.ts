import { Router } from "express";
import { ExpensesController } from "./expenses.controller";

export const expensesRouter = Router();
const controller = new ExpensesController();

expensesRouter.get("/expenses", controller.listExpenses);
expensesRouter.post("/expenses", controller.createExpense);
expensesRouter.delete("/expenses/:id", controller.deleteExpense);
