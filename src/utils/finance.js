const uniqueCategories = (transactions) =>
  [...new Set(transactions.map((t) => t.category))].sort();

export function filterTransactions(transactions, filters) {
  return transactions.filter((t) => {
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      const hay = `${t.id} ${t.category} ${t.description ?? ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filters.category && t.category !== filters.category) return false;
    if (filters.type && t.type !== filters.type) return false;
    if (filters.status && filters.status !== "all" && t.status !== filters.status)
      return false;
    if (filters.dateFrom && t.date < filters.dateFrom) return false;
    if (filters.dateTo && t.date > filters.dateTo) return false;
    return true;
  });
}

export function sortTransactions(transactions, sortBy, sortDir) {
  const dir = sortDir === "asc" ? 1 : -1;
  return [...transactions].sort((a, b) => {
    let cmp = 0;
    if (sortBy === "date") cmp = a.date.localeCompare(b.date);
    else if (sortBy === "amount") cmp = a.amount - b.amount;
    else if (sortBy === "category") cmp = a.category.localeCompare(b.category);
    else if (sortBy === "type") cmp = a.type.localeCompare(b.type);
    return cmp * dir;
  });
}

export function computeSummary(transactions) {
  let income = 0;
  let expenses = 0;
  for (const t of transactions) {
    if (t.type === "income") income += t.amount;
    else expenses += t.amount;
  }
  return { income, expenses, balance: income - expenses };
}

/** End-of-day running balance, chronological */
export function balanceTrendByDay(transactions) {
  const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
  let balance = 0;
  const byDay = new Map();
  for (const t of sorted) {
    balance += t.type === "income" ? t.amount : -t.amount;
    byDay.set(t.date, balance);
  }
  return [...byDay.entries()]
    .map(([date, balance]) => ({ date, balance }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function spendingByCategory(transactions) {
  const map = new Map();
  for (const t of transactions) {
    if (t.type !== "expense") continue;
    map.set(t.category, (map.get(t.category) || 0) + t.amount);
  }
  return [...map.entries()].map(([name, value]) => ({ name, value }));
}

export function buildInsights(transactions) {
  const spending = spendingByCategory(transactions);
  const topCategory =
    spending.length > 0
      ? [...spending].sort((a, b) => b.value - a.value)[0]
      : null;

  const byMonth = new Map();
  for (const t of transactions) {
    const key = t.date.slice(0, 7);
    if (!byMonth.has(key)) {
      byMonth.set(key, { income: 0, expense: 0 });
    }
    const m = byMonth.get(key);
    if (t.type === "income") m.income += t.amount;
    else m.expense += t.amount;
  }
  const monthKeys = [...byMonth.keys()].sort();
  let monthCompare = null;
  if (monthKeys.length >= 2) {
    const prev = monthKeys[monthKeys.length - 2];
    const curr = monthKeys[monthKeys.length - 1];
    const ePrev = byMonth.get(prev).expense;
    const eCurr = byMonth.get(curr).expense;
    const delta = eCurr - ePrev;
    const pct = ePrev > 0 ? Math.round((delta / ePrev) * 100) : null;
    monthCompare = { prev, curr, ePrev, eCurr, delta, pct };
  }

  const summary = computeSummary(transactions);
  const expenseTx = transactions.filter((t) => t.type === "expense");
  const avgExpense =
    expenseTx.length > 0
      ? Math.round(expenseTx.reduce((s, t) => s + t.amount, 0) / expenseTx.length)
      : 0;

  return { topCategory, monthCompare, summary, avgExpense, monthKeys };
}

export { uniqueCategories };
