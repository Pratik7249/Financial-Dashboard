import { Grid, Paper, Typography, Stack, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useAppContext } from "../context/useAppContext";

const fmt = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function StatCard({ title, value, sub, icon, accent }) {
  const IconGlyph = icon;
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        height: "100%",
        borderRadius: 2,
        borderLeft: 4,
        borderLeftColor: accent,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5 }}>
            {value}
          </Typography>
          {sub && (
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
              {sub}
            </Typography>
          )}
        </Box>
        <IconGlyph sx={{ color: accent, opacity: 0.85 }} fontSize="large" />
      </Stack>
    </Paper>
  );
}

function SummaryCards() {
  const { summary } = useAppContext();
  const { balance, income, expenses } = summary;

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <StatCard
          title="Net balance"
          value={fmt.format(balance)}
          sub="Income minus expenses (all data)"
          icon={AccountBalanceWalletIcon}
          accent="primary.main"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <StatCard
          title="Total income"
          value={fmt.format(income)}
          sub="Sum of credited amounts"
          icon={TrendingUpIcon}
          accent="success.main"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <StatCard
          title="Total expenses"
          value={fmt.format(expenses)}
          sub="Sum of debited amounts"
          icon={TrendingDownIcon}
          accent="error.main"
        />
      </Grid>
    </Grid>
  );
}

export default SummaryCards;
