import { Box, Grid, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import CustomTable from "../components/Table";
import OverviewCards from "../components/OverviewCards";
import Charts from "../components/Charts";
import Insights from "../components/Insights";

function Dashboard() {
  return (
    <Box sx={{ background: "#f5f7fb", minHeight: "100vh" }}>

      <Navbar />

      <Container maxWidth="xl" sx={{ mt: 3 }}>

        {/* 🔹 TOP SECTION */}
        <Grid container spacing={2} alignItems="stretch">

          {/* LEFT: Charts */}
          <Grid item xs={12} md={5}>

            {/* Stack everything vertically */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

              {/* Charts */}
              <Charts />

              {/* Overview + Insights in one row */}
              <Grid container spacing={2}>

                <Grid item xs={12} md={6}>
                  <OverviewCards />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Insights />
                </Grid>

              </Grid>

            </Box>

          </Grid>


          {/* RIGHT: Table */}
          <Grid item xs={12} md={7}>
            <Box sx={{ height: "100%" }}>
              <CustomTable />
            </Box>
          </Grid>

        </Grid>

      </Container>

    </Box>
  );
}

export default Dashboard;