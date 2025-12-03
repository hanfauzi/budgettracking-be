import type { Request, Response } from "express";
import { ExpensesService } from "./expenses.service";

export class ExpensesController {
  private expensesService: ExpensesService;
  constructor() {
    this.expensesService = new ExpensesService();
  }

  listExpenses = (_req: Request, res: Response) => {
    const result = this.expensesService.listExpenses();
    res.json(result);
  };

  createExpense = (req: Request, res: Response) => {
    try {
      const { desc, amount } = req.body;
      const result = this.expensesService.createExpense(desc, amount);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  deleteExpense = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID tidak valid" });
    }

    this.expensesService.removeExpense(id);
    res.json({ success: true });
  };
}
