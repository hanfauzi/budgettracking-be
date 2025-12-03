import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ================= In-memory data =================
type Expense = {
  id: number;
  description: string;
  amount: number;
};

let budget = 0;
let expenses: Expense[] = [];
let nextExpenseId = 1;

// Helper untuk hitung summary
function computeSummary() {
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

// ================= Routes =================

// Health check
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Budget Tracker API is running' });
});

//
// GET /api/budget
// Ambil data budget
//
app.get('/api/budget', (_req: Request, res: Response) => {
  res.json({ budget });
});

//
// PUT /api/budget
// Set / update budget
// Body: { budget: number }
// Validasi: budget > 0
//
app.put('/api/budget', (req: Request, res: Response) => {
  const { budget: newBudget } = req.body;

  if (typeof newBudget !== 'number' || isNaN(newBudget) || newBudget <= 0) {
    return res
      .status(400)
      .json({ error: 'Budget harus lebih dari 0' });
  }

  budget = newBudget;
  return res.json({ budget });
});

//
// GET /api/expenses
// List semua expenses
//
app.get('/api/expenses', (_req: Request, res: Response) => {
  res.json(expenses);
});

//
// POST /api/expenses
// Tambah expense baru
// Body: { desc: string, amount: number }
//
// Validasi:
// - deskripsi kosong -> 400 { "error": "Deskripsi tidak boleh kosong" }
// - amount <= 0      -> 400 { "error": "Amount harus lebih dari 0" }
// - amount > sisa    -> 400 { "error": "Expense melebihi sisa budget" }
//
app.post('/api/expenses', (req: Request, res: Response) => {
  const { desc, amount } = req.body as { desc?: string; amount?: number };

  // deskripsi
  if (!desc || desc.trim().length === 0) {
    return res
      .status(400)
      .json({ error: 'Deskripsi tidak boleh kosong' });
  }

  // amount
  if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
    return res
      .status(400)
      .json({ error: 'Amount harus lebih dari 0' });
  }

  // cek sisa budget
  const { remaining } = computeSummary();
  if (amount > remaining) {
    return res
      .status(400)
      .json({ error: 'Expense melebihi sisa budget' });
  }

  const newExpense: Expense = {
    id: nextExpenseId++,
    description: desc.trim(),
    amount,
  };

  expenses.push(newExpense);

  // contoh response: { "id": 1, ... }
  return res.status(201).json(newExpense);
});

//
// DELETE /api/expenses/:id
// Hapus expense
// Response: { "success": true }
//
app.delete('/api/expenses/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    // bisa juga dibikin 400, tapi biar simpel:
    return res.status(400).json({ error: 'ID tidak valid' });
  }

  expenses = expenses.filter((e) => e.id !== id);

  return res.json({ success: true });
});

//
// GET /api/summary
// Ringkasan status budget
// Response contoh:
// {
//   budget: 1000000,
//   totalExpense: 750000,
//   remaining: 250000,
//   percentage: 75,
//   status: "warning"
// }
//
app.get('/api/summary', (_req: Request, res: Response) => {
  const summary = computeSummary();
  res.json(summary);
});

// ================ Error handler ===================
app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
