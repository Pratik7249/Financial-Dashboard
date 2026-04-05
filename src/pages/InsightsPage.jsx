import { Box, Grid, Typography } from "@mui/material";
import Charts from "../components/Charts-detailed.jsx";
import OverviewCards from "../components/OverviewCards";
import Insights from "../components/Insights";

export default function InsightsPage() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Insights Dashboard
      </Typography>

      <Grid container spacing={2}>
        
        <Grid item xs={12}>
          <OverviewCards />
        </Grid>

        <Grid item xs={12}>
          <Insights />
        </Grid>

        <Grid item xs={12}>
          <Charts />
        </Grid>

      </Grid>
    </Box>
  );
}