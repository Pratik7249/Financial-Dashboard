import { useAppContext } from "../context/AppContext";

export default function Insights() {
  const { transactions } = useAppContext();

  const expenses = transactions.filter(t => t.type === "expense");
  const totalIncome = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);

  const categoryMap = {};
  expenses.forEach(t => { categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount; });

  let highestCategory = "N/A", maxAmount = 0;
  for (let cat in categoryMap) {
    if (categoryMap[cat] > maxAmount) { maxAmount = categoryMap[cat]; highestCategory = cat; }
  }

  const percent = totalExpense > 0 ? ((maxAmount / totalExpense) * 100).toFixed(0) : 0;
  const savingsRate = totalIncome > 0 ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(0) : 0;
  const isHealthy = totalExpense <= totalIncome;

  const insights = [
    {
      emoji: isHealthy ? "✅" : "⚠️",
      title: "Financial Health",
      text: isHealthy ? "Expenses are within income — great management!" : "Expenses exceed income — review your spending.",
      color: isHealthy ? "var(--success)" : "var(--danger)",
      bg: isHealthy ? "var(--success-bg)" : "var(--danger-bg)",
    },
    {
      emoji: "📊",
      title: "Top Spending Category",
      text: highestCategory !== "N/A" ? `${highestCategory} takes ${percent}% of your total expenses.` : "No expense data.",
      color: "var(--warning)",
      bg: "var(--warning-bg)",
    },
    {
      emoji: "💵",
      title: "Savings Rate",
      text: `You're saving ${savingsRate}% of your income this period.`,
      color: savingsRate > 20 ? "var(--success)" : "var(--accent)",
      bg: savingsRate > 20 ? "var(--success-bg)" : "var(--accent-bg)",
    },
  ];

  return (
    <div style={{
      background: "var(--bg-surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      padding: "20px",
      boxShadow: "var(--shadow-sm)",
      height: "100%",
    }}>
      <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "16px", color: "var(--text-primary)" }}>
        Financial Insights
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {insights.map((ins, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: "12px",
            padding: "12px", borderRadius: "var(--radius-md)",
            background: ins.bg, border: `1px solid ${ins.color}22`,
          }}>
            <span style={{ fontSize: "18px", lineHeight: 1, marginTop: "1px" }}>{ins.emoji}</span>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 600, color: ins.color, marginBottom: "2px" }}>{ins.title}</div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{ins.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
