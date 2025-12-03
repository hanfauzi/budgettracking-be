import type { Request, Response } from "express";
import { BudgetService } from "./budget.service";

export class BudgetController {
  private budgetService: BudgetService;
  constructor() {
    this.budgetService = new BudgetService();
  }

  getBudget = (_req: Request, res: Response) => {
    const result = this.budgetService.getBudget();
    res.json(result);
  };

  updateBudget = (req: Request, res: Response) => {
    try {
      const { budget } = req.body;
      const result = this.budgetService.updateBudget(budget);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
}
