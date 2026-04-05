import { Box, Grid, Typography } from "@mui/material";
import Charts from "../components/Charts-detailed.jsx";
import OverviewCards from "../components/OverviewCards";
import Insights from "../components/Insights";

export default function InsightsPage() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Insights Dashboard
      </Typography>

      <Grid container spacing={2} justifyContent="center">

        <Grid item xs={12}>
          <OverviewCards />
        </Grid>

        <Grid item xs={12} md={8}>
          <Insights />
        </Grid>

        {/* 🔥 Charts Section */}
        <Grid item xs={12} md={10}>
          <Charts />
        </Grid>

      </Grid>
    </Box>
  );
}