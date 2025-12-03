import {
  addExpense,
  computeSummary,
  deleteExpense,
  getExpenses,
} from "../../data/store";

export class ExpensesService {
  listExpenses() {
    return getExpenses();
  }

  createExpense(desc: string, amount: number) {
    if (!desc || desc.trim().length === 0) {
      throw new Error("Deskripsi tidak boleh kosong");
    }

    if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
      throw new Error("Amount harus lebih dari 0");
    }

    const { remaining } = computeSummary();
    if (amount > remaining) {
      throw new Error("Expense melebihi sisa budget");
    }

    return addExpense({
      description: desc.trim(),
      amount,
    });
  }

  removeExpense(id: number) {
    deleteExpense(id);
  }
}
