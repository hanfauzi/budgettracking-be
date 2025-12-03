import { Router } from "express";
import { SummaryController } from "./summary.controller";

export const summaryRouter = Router();
const controller = new SummaryController();

summaryRouter.get("/summary", controller.getSummary);
