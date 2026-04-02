import { Box, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import CustomTable from "../components/Table";

function Dashboard() {
  return (
    <Box>

      {/* Navbar */}
      <Navbar />

      {/* Layout */}
      <Grid container>
        
        {/* Sidebar */}
        <Grid item xs={12} md={3} sx={{ borderRight: "1px solid #ddd", minHeight: "100vh" }}>
          <Filters />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <CustomTable />
        </Grid>

      </Grid>

    </Box>
  );
}

export default Dashboard;