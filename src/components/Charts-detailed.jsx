import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Brush,
} from "recharts";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

function Charts() {
  const { transactions } = useAppContext();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filtered = transactions.filter((t) => {
    return (
      (!startDate || t.date >= startDate) &&
      (!endDate || t.date <= endDate)
    );
  });

  const lineData = [...filtered]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((t) => ({
      date: t.date,
      amount: t.amount,
    }));

  const categoryMap = {};
  filtered.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  return (
    <Grid container spacing={2}>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>

            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Transaction Trend
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                type="date"
                size="small"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <TextField
                type="date"
                size="small"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Box>

            <ResponsiveContainer width={750} height={280}>
              <LineChart data={lineData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#1976d2" />
              </LineChart>
            </ResponsiveContainer>

          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>

            <Typography variant="subtitle1">
              Spending by Category
            </Typography>

            <ResponsiveContainer width={350} height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

          </CardContent>
        </Card>
      </Grid>

    </Grid>
  );
}

export default Charts;