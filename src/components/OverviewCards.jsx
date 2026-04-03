import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { useAppContext } from "../context/AppContext";

function OverviewCards() {
  const { transactions } = useAppContext();

  // 🔹 Calculations
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>

        {/* Balance */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="subtitle2">Total Balance</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                ₹ {balance}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Income */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="subtitle2">Total Income</Typography>
              <Typography variant="h5" color="green">
                ₹ {totalIncome}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Expense */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="subtitle2">Total Expenses</Typography>
              <Typography variant="h5" color="error">
                ₹ {totalExpense}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
}

export default OverviewCards;