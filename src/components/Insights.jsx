import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { useAppContext } from "../context/AppContext";

function Insights() {
  const { transactions } = useAppContext();

  // 🔹 Expense transactions only
  const expenses = transactions.filter((t) => t.type === "expense");

  // 🏆 Highest Spending Category
  const categoryMap = {};

  expenses.forEach((t) => {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + t.amount;
  });

  let highestCategory = "N/A";
  let maxAmount = 0;

  for (let cat in categoryMap) {
    if (categoryMap[cat] > maxAmount) {
      maxAmount = categoryMap[cat];
      highestCategory = cat;
    }
  }

  // 📊 Income vs Expense
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // 🔍 Smart Financial Observation

  let observation = "";
  let suggestion = "";
  const percent = ((maxAmount / totalExpense) * 100).toFixed(0);

  if (totalExpense > totalIncome) {
    observation = "Expenses are higher than income ⚠️";
  } else {
    observation = "You are managing your finances well 💰";
  }

  // Suggestion based on highest category
  if (highestCategory !== "N/A") {
    suggestion = `${highestCategory} accounts for ${percent}% of your spending. Consider proper usage of it.`;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={2}>

        {/* Highest Spending */}
        {/* Observation */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="subtitle2">
                Financial Insight
              </Typography>

              <Typography
                variant="body1"
                color={totalExpense > totalIncome ? "error" : "green"}
              >
                {observation}
              </Typography>

              <Typography variant="body2" sx={{ mt: 1 }}>
                {suggestion}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
}

export default Insights;