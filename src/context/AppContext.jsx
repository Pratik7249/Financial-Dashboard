import { useCallback, useEffect, useMemo, useState } from "react";
import { AppContext } from "./AppContext";
import transactionsData from "../data/mockData";
import {
  balanceTrendByDay,
  buildInsights,
  computeSummary,
  filterTransactions,
  sortTransactions,
  spendingByCategory,
  uniqueCategories,
} from "../utils/finance";

const STORAGE_KEY = "finance-dashboard-v1";

function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function AppProvider({ children }) {
  const persisted = loadPersisted();

  const [transactions, setTransactions] = useState(
    () => persisted?.transactions ?? transactionsData
  );
  const [role, setRole] = useState(() => persisted?.role ?? "viewer");
  const [colorMode, setColorMode] = useState(() => persisted?.colorMode ?? "light");

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    type: "",
    status: "all",
    dateFrom: "",
    dateTo: "",
  });

  const [sortBy, setSortBy] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  useEffect(() => {
    const payload = {
      transactions,
      role,
      colorMode,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* ignore quota */
    }
  }, [transactions, role, colorMode]);

  const filtered = useMemo(
    () => filterTransactions(transactions, filters),
    [transactions, filters]
  );

  const visibleTransactions = useMemo(
    () => sortTransactions(filtered, sortBy, sortDir),
    [filtered, sortBy, sortDir]
  );

  const summary = useMemo(() => computeSummary(transactions), [transactions]);
  const trend = useMemo(() => balanceTrendByDay(transactions), [transactions]);
  const categorySpend = useMemo(
    () => spendingByCategory(transactions),
    [transactions]
  );
  const insights = useMemo(() => buildInsights(transactions), [transactions]);
  const categories = useMemo(
    () => uniqueCategories(transactions),
    [transactions]
  );

  const isAdmin = role === "admin";

  const addTransaction = useCallback((row) => {
    setTransactions((prev) => [{ ...row, id: row.id || `TXN${Date.now()}` }, ...prev]);
  }, []);

  const updateTransaction = useCallback((id, patch) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t))
    );
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: "",
      category: "",
      type: "",
      status: "all",
      dateFrom: "",
      dateTo: "",
    });
  }, []);

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [transactions]);

  const exportCsv = useCallback(() => {
    const headers = ["id", "date", "amount", "category", "type", "status", "description"];
    const lines = [
      headers.join(","),
      ...transactions.map((t) =>
        headers
          .map((h) => {
            const v = t[h] ?? "";
            const s = String(v).replace(/"/g, '""');
            return /[",\n]/.test(s) ? `"${s}"` : s;
          })
          .join(",")
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [transactions]);

  const value = useMemo(
    () => ({
      transactions,
      setTransactions,
      role,
      setRole,
      colorMode,
      setColorMode,
      filters,
      setFilters,
      sortBy,
      setSortBy,
      sortDir,
      setSortDir,
      filteredCount: filtered.length,
      visibleTransactions,
      summary,
      trend,
      categorySpend,
      insights,
      categories,
      isAdmin,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      resetFilters,
      exportJson,
      exportCsv,
    }),
    [
      transactions,
      role,
      colorMode,
      filters,
      sortBy,
      sortDir,
      filtered.length,
      visibleTransactions,
      summary,
      trend,
      categorySpend,
      insights,
      categories,
      isAdmin,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      resetFilters,
      exportJson,
      exportCsv,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
