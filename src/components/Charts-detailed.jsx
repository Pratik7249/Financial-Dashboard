import {
  LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell,
  ResponsiveContainer, CartesianGrid, Legend, Brush,
} from "recharts";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "var(--bg-surface)", border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)", padding: "10px 14px",
        boxShadow: "var(--shadow-md)", fontSize: "12px",
      }}>
        <div style={{ color: "var(--text-muted)", marginBottom: "4px" }}>{label}</div>
        <div style={{ fontWeight: 700, color: "var(--accent)", fontSize: "14px" }}>
          ₹{Number(payload[0].value).toLocaleString("en-IN")}
        </div>
      </div>
    );
  }
  return null;
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
        <div style={{ color: "var(--accent)" }}>₹{Number(payload[0].value).toLocaleString("en-IN")}</div>
      </div>
    );
  }
  return null;
};

const inputStyle = {
  background: "var(--bg-base)", border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)", padding: "6px 10px",
  fontSize: "12px", color: "var(--text-primary)", outline: "none",
  fontFamily: "var(--font-body)", cursor: "pointer",
};

export default function ChartsDetailed() {
  const { transactions } = useAppContext();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filtered = transactions.filter(t =>
    (!startDate || t.date >= startDate) && (!endDate || t.date <= endDate)
  );

  const lineData = [...filtered]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(t => ({ date: t.date.slice(5), amount: t.amount }));

  const categoryMap = {};
  filtered.forEach(t => {
    if (t.type === "expense") categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });
  const pieData = Object.keys(categoryMap).map(key => ({ name: key, value: categoryMap[key] }));

  const cardStyle = {
    background: "var(--bg-surface)", border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)", padding: "20px",
    boxShadow: "var(--shadow-sm)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      
      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "2px" }}>
              Transaction Trend
            </h3>
            <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>Filter by date range</p>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} />
            <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>→</span>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={inputStyle} />
            {(startDate || endDate) && (
              <button onClick={() => { setStartDate(""); setEndDate(""); }} style={{
                ...inputStyle, cursor: "pointer", background: "var(--danger-bg)",
                color: "var(--danger)", border: "1px solid var(--danger-bg)",
                fontWeight: 600,
              }}>
                Clear
              </button>
            )}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={lineData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="amount" stroke="var(--accent)" strokeWidth={2.5}
              dot={{ fill: "var(--accent)", r: 3 }} activeDot={{ r: 5 }} />
            {lineData.length > 8 && <Brush dataKey="date" height={20} stroke="var(--border)" />}
          </LineChart>
        </ResponsiveContainer>
      </div>

     
      <div style={cardStyle}>
        <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
          Spending by Category
        </h3>
        <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "16px" }}>Filtered expense breakdown</p>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%"
              innerRadius={50} outerRadius={90} paddingAngle={3}>
              {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip content={<PieTooltip />} />
            <Legend iconType="circle" iconSize={8}
              formatter={(v) => <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{v}</span>} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
