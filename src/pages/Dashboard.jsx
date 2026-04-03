import { Box, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import CustomTable from "../components/Table";
import OverviewCards from "../components/OverviewCards";
import Charts from "../components/Charts";

function Dashboard() {
  return (
    <Box>

      <Navbar />

      {/* Overview Cards */}
      <OverviewCards />
      <Charts />

      {/* Main Layout */}
      <Grid container>
        
        <Grid item xs={12} md={3}>
          <Filters />
        </Grid>

        <Grid item xs={12} md={9}>
          <CustomTable />
        </Grid>

      </Grid>

    </Box>
  );
}

export default Dashboard;