import { useAppContext } from "../context/AppContext";

function StatCard({ label, value, color, bgColor, icon, trend }) {
  return (
    <div style={{
      background: "var(--bg-surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      padding: "20px",
      display: "flex", flexDirection: "column", gap: "12px",
      boxShadow: "var(--shadow-sm)",
      transition: "box-shadow 0.2s ease, transform 0.2s ease",
      cursor: "default",
      flex: 1, minWidth: 0,
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: 40, height: 40, borderRadius: "var(--radius-sm)",
          background: bgColor, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px",
        }}>
          {icon}
        </div>
        {trend !== undefined && (
          <span style={{
            fontSize: "11px", fontWeight: 600, padding: "3px 8px",
            borderRadius: "99px",
            background: trend >= 0 ? "var(--success-bg)" : "var(--danger-bg)",
            color: trend >= 0 ? "var(--success)" : "var(--danger)",
          }}>
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
        )}
      </div>

      <div>
        <div style={{ fontSize: "11px", fontWeight: 500, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
          {label}
        </div>
        <div style={{ fontSize: "24px", fontWeight: 700, color: color, fontFamily: "var(--font-display)" }}>
          ₹{value.toLocaleString("en-IN")}
        </div>
      </div>
    </div>
  );
}

export default function OverviewCards() {
  const { transactions } = useAppContext();

  const totalIncome = transactions.filter(t => t.type === "income").reduce((a, c) => a + c.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((a, c) => a + c.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
      <StatCard
        label="Net Balance"
        value={balance}
        color={balance >= 0 ? "var(--success)" : "var(--danger)"}
        bgColor={balance >= 0 ? "var(--success-bg)" : "var(--danger-bg)"}
        icon="💰"
        trend={12}
      />
      <StatCard
        label="Total Income"
        value={totalIncome}
        color="var(--success)"
        bgColor="var(--success-bg)"
        icon="📈"
        trend={8}
      />
      <StatCard
        label="Total Expenses"
        value={totalExpense}
        color="var(--danger)"
        bgColor="var(--danger-bg)"
        icon="📉"
        trend={-3}
      />
    </div>
  );
}
