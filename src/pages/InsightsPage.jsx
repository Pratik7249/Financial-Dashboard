import { Box, Grid, Typography } from "@mui/material";
import Charts from "../components/Charts-detailed.jsx";
import OverviewCards from "../components/OverviewCards";
import Insights from "../components/Insights";
import SuccessRatio from "../components/SuccessRatio";

export default function InsightsPage() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Insights Dashboard
      </Typography>

      <Grid container spacing={2}>

        {/* 🔥 SAME ROW */}
        <Grid item xs={12} md={5}>
          <OverviewCards />
        </Grid>

        <Grid item xs={12} md={7}>
          <Insights />
        </Grid>

        {/* KEEP EVERYTHING SAME BELOW */}
        <Grid item xs={12} md={6}>
          <SuccessRatio />
        </Grid>

        <Grid item xs={12} md={6}>
          <Charts />
        </Grid>

      </Grid>
    </Box>
  );
}