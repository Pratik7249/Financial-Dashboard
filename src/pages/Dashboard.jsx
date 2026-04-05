import { Box, Container, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import SummaryCards from "../components/SummaryCards";
import ChartsSection from "../components/ChartsSection";
import InsightsPanel from "../components/InsightsPanel";
import TransactionTable from "../components/TransactionTable";

function Dashboard() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />
      <Container maxWidth="xl" sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Overview
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Track balances, spending, and activity. Switch role to compare viewer vs admin capabilities.
        </Typography>

        <SummaryCards />

        <Box sx={{ mt: 3 }}>
          <ChartsSection />
        </Box>

        <Box sx={{ mt: 3 }}>
          <InsightsPanel />
        </Box>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              sx={{
                position: { md: "sticky" },
                top: { md: 16 },
                bgcolor: "background.paper",
                borderRadius: 2,
                border: 1,
                borderColor: "divider",
              }}
            >
              <Filters />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <TransactionTable />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;
