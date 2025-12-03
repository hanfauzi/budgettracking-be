export type Expense = {
  id: number;
  description: string;
  amount: number;
};

let budget = 0;
let expenses: Expense[] = [];
let nextExpenseId = 1;

export function getBudget() {
  return budget;
}

export function setBudget(newBudget: number) {
  budget = newBudget;
}

export function getExpenses() {
  return expenses;
}

export function addExpense(expense: Omit<Expense, 'id'>) {
  const newExpense: Expense = {
    id: nextExpenseId++,
    ...expense,
  };
  expenses.push(newExpense);
  return newExpense;
}

export function deleteExpense(id: number) {
  expenses = expenses.filter((e) => e.id !== id);
}

export function computeSummary() {
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = budget - totalExpense;
  const percentage = budget > 0 ? (totalExpense / budget) * 100 : 0;

  let status: 'safe' | 'warning' | 'danger' = 'safe';

  if (budget === 0) {
    status = 'safe';
  } else if (percentage < 80) {
    status = 'safe';
  } else if (percentage <= 100) {
    status = 'warning';
  } else {
    status = 'danger';
  }

  return {
    budget,
    totalExpense,
    remaining,
    percentage,
    status,
  };
}
