import { Paper, Typography, Stack, Chip, Box } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { useAppContext } from "../context/useAppContext";

const fmt = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function InsightRow({ title, body }) {
  return (
    <Box>
      <Typography variant="body2" fontWeight={600} color="text.secondary">
        {title}
      </Typography>
      <Typography variant="body1" sx={{ mt: 0.25 }}>
        {body}
      </Typography>
    </Box>
  );
}

function InsightsPanel() {
  const { insights, transactions } = useAppContext();
  const { topCategory, monthCompare, avgExpense, summary } = insights;

  const rows = [];

  if (topCategory) {
    rows.push({
      title: "Highest spending category",
      body: `${topCategory.name} leads at ${fmt.format(topCategory.value)} in expenses.`,
    });
  } else {
    rows.push({
      title: "Highest spending category",
      body: "Add expense transactions to see a category leader.",
    });
  }

  if (monthCompare) {
    const { prev, curr, ePrev, eCurr, delta, pct } = monthCompare;
    const dir = delta > 0 ? "up" : delta < 0 ? "down" : "flat";
    const pctStr = pct != null ? `${Math.abs(pct)}%` : "n/a";
    rows.push({
      title: "Month-over-month expenses",
      body: `${curr} vs ${prev}: ${fmt.format(eCurr)} vs ${fmt.format(ePrev)} (${dir === "up" ? "+" : dir === "down" ? "−" : ""}${fmt.format(Math.abs(delta))}, ${pctStr} vs prior month).`,
    });
  } else {
    rows.push({
      title: "Month-over-month expenses",
      body: "Need at least two calendar months of data to compare.",
    });
  }

  const savingsRate =
    summary.income > 0
      ? Math.round(((summary.income - summary.expenses) / summary.income) * 100)
      : null;

  rows.push({
    title: "Quick read",
    body:
      transactions.length === 0
        ? "No activity recorded — start by adding a transaction (admin role)."
        : savingsRate != null
          ? `Average expense size is about ${fmt.format(avgExpense)}. Net savings rate vs income: ${savingsRate}%.`
          : `Average expense size is about ${fmt.format(avgExpense)}.`,
  });

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <LightbulbOutlinedIcon color="primary" />
        <Typography variant="subtitle1" fontWeight={700}>
          Insights
        </Typography>
        <Chip size="small" label="From mock data" variant="outlined" />
      </Stack>
      <Stack spacing={2}>
        {rows.map((r) => (
          <InsightRow key={r.title} title={r.title} body={r.body} />
        ))}
      </Stack>
    </Paper>
  );
}

export default InsightsPanel;
