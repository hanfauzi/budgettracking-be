import { prisma } from "../../db/prisma";
import { AppError } from "../../utils/app.error";
import { SetUpdateBudgetDTO } from "./dto/set-update-budget.dto";

export class BudgetService {
  constructor() {}

  getBudget = async (userId: number) => {
    const budget = await prisma.budget.findFirst({
      where: { userId },
    });

    if (!budget) {
      throw new AppError("Budget not found", 404);
    }

    return { amount: budget?.amount };
  };

  setUpdateBudget = async ({
    userId,
    period,
    amount,
  }: { userId: number } & SetUpdateBudgetDTO) => {
    if (!period) {
      throw new AppError("Period is required (format YYYY-MM)", 400);
    }

    if (!amount || amount <= 0) {
      throw new AppError("Amount must be greater than zero", 400);
    }

    const budget = await prisma.budget.upsert({
      where: { userId_period: { userId, period } },
      update: { amount },
      create: { userId, period, amount },
    });

    return {
      userId: budget.userId,
      period: budget.period,
      amount: budget.amount,
    };
  };
}
