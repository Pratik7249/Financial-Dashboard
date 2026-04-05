import { Box, Grid, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import CustomTable from "../components/Table";
import OverviewCards from "../components/OverviewCards";
import Charts from "../components/Charts";
import Insights from "../components/Insights";

function Dashboard() {
  return (
    <Box sx={{ background: "#f5f7fb", minHeight: "100vh" }}>
      
      <Navbar />

      {/* Main Container */}
      <Container maxWidth="lg" sx={{ mt: 3 }}>

        {/* Overview Cards */}
        <OverviewCards />

        {/* Charts Section */}
        <Box sx={{ mt: 3 }}>
          <Charts />
          <Insights />
        </Box>

        {/* Bottom Section */}
        <Grid container spacing={2} sx={{ mt: 1 }}>
          
          {/* Filters */}
          <Grid item xs={12} md={3}>
            <Filters />
          </Grid>

          {/* Table */}
          <Grid item xs={12} md={9}>
            <CustomTable />
          </Grid>

        </Grid>

      </Container>

    </Box>
  );
}

export default Dashboard;