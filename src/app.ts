import express from "express";
import cors from "cors";
import type { NextFunction, Request, Response } from "express";
import { budgetRouter } from "./modules/budget/budget.routes";
import { expensesRouter } from "./modules/expenses/expenses.routes";
import { summaryRouter } from "./modules/summary/summary.routes";

export const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Budget Tracker API is running" });
});

// pakai router
app.use("/api", budgetRouter);
app.use("/api", expensesRouter);
app.use("/api", summaryRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});
