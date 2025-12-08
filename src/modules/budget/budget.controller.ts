import type { NextFunction, Request, Response } from "express";
import { BudgetService } from "./budget.service";

export class BudgetController {
  private budgetService: BudgetService;
  constructor() {
    this.budgetService = new BudgetService();
  }

  getBudget = (_req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.payload.id;
      const result = this.budgetService.getBudget(userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  setUpdateBudget = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.payload.id;
      const result = await this.budgetService.setUpdateBudget({
        userId,
        ...req.body,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
