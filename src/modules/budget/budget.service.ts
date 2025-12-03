import { getBudget, setBudget } from "../../data/store";

export class BudgetService {
  getBudget() {
    return { budget: getBudget() };
  }

  updateBudget(value: number) {
    if (typeof value !== 'number' || isNaN(value) || value <= 0) {
      throw new Error('Budget harus lebih dari 0');
    }

    setBudget(value);
    return { budget: getBudget() };
  }
}
