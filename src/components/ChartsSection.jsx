import { Paper, Typography, Box, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useAppContext } from "../context/useAppContext";

const fmt = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        px: 1.5,
        py: 1,
        boxShadow: 2,
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={600}>
        {payload.map((p) => `${p.name}: ${typeof p.value === "number" ? fmt.format(p.value) : p.value}`).join(" · ")}
      </Typography>
    </Box>
  );
}

function ChartsSection() {
  const theme = useTheme();
  const { trend, categorySpend } = useAppContext();
  const primary = theme.palette.primary.main;
  const tick = theme.palette.text.secondary;
  const grid = theme.palette.divider;

  const barData = [...categorySpend].sort((a, b) => b.value - a.value);

  const emptyTrend = trend.length === 0;
  const emptyBar = barData.length === 0;

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, lg: 7 }}>
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: 360 }}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Balance trend
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
            Running net balance after each day (chronological)
          </Typography>
          {emptyTrend ? (
            <Box sx={{ height: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography color="text.secondary">No transactions to chart yet.</Typography>
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={grid} />
                <XAxis dataKey="date" tick={{ fill: tick, fontSize: 11 }} tickMargin={8} />
                <YAxis tick={{ fill: tick, fontSize: 11 }} tickFormatter={(v) => fmt.format(v)} width={72} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="balance" name="Balance" stroke={primary} strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, lg: 5 }}>
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: 360 }}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Spending by category
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
            Expense totals (full dataset)
          </Typography>
          {emptyBar ? (
            <Box sx={{ height: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography color="text.secondary">No expense rows to show.</Typography>
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={grid} horizontal={false} />
                <XAxis type="number" tick={{ fill: tick, fontSize: 11 }} tickFormatter={(v) => fmt.format(v)} />
                <YAxis type="category" dataKey="name" width={100} tick={{ fill: tick, fontSize: 11 }} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="value" name="Spent" fill={primary} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ChartsSection;
