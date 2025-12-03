import type { Request, Response } from "express";
import { SummaryService } from "./summary.service";

export class SummaryController {
  private summaryService: SummaryService;
  constructor() {
    this.summaryService = new SummaryService();
  }

  getSummary = (_req: Request, res: Response) => {
    const result = this.summaryService.getSummary();
    res.json(result);
  };
}
