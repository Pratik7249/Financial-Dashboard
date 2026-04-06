import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useAppContext } from "../context/AppContext";

const STATUS_COLORS = {
  Success: "#10b981",
  Failed: "#ef4444",
  Pending: "#f59e0b",
};

const PieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "var(--bg-surface)", border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)", padding: "10px 14px",
        boxShadow: "var(--shadow-md)", fontSize: "12px",
      }}>
        <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "2px" }}>{payload[0].name}</div>
        <div style={{ color: "var(--text-secondary)" }}>{payload[0].value} transactions</div>
      </div>
    );
  }
  return null;
};

export default function SuccessRatio() {
  const { transactions } = useAppContext();

  const success = transactions.filter(t => t.status === "success").length;
  const failed = transactions.filter(t => t.status === "failed").length;
  const pending = transactions.filter(t => t.status === "pending").length;
  const total = transactions.length;

  const data = [
    { name: "Success", value: success },
    { name: "Failed", value: failed },
    { name: "Pending", value: pending },
  ];

  return (
    <div style={{
      background: "var(--bg-surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)", padding: "20px",
      boxShadow: "var(--shadow-sm)", height: "100%",
    }}>
      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
        Transaction Status
      </h3>
      <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "16px" }}>
        {total} total transactions
      </p>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        {data.map(item => (
          <div key={item.name} style={{
            flex: 1, minWidth: "80px",
            background: `${STATUS_COLORS[item.name]}12`,
            border: `1px solid ${STATUS_COLORS[item.name]}30`,
            borderRadius: "var(--radius-sm)", padding: "10px 12px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "18px", fontWeight: 700, color: STATUS_COLORS[item.name], fontFamily: "var(--font-display)" }}>
              {item.value}
            </div>
            <div style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {item.name}
            </div>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%"
            innerRadius={45} outerRadius={75} paddingAngle={3}>
            {data.map((entry) => <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />)}
          </Pie>
          <Tooltip content={<PieTooltip />} />
          <Legend iconType="circle" iconSize={8}
            formatter={(v) => <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{v}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
