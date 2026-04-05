import { Box, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import CustomTable from "../components/Table";
import OverviewCards from "../components/OverviewCards";
import Charts from "../components/Charts";
import Insights from "../components/Insights";
import Grid from "@mui/material/Grid";

function Dashboard() {
  return (
    <Box sx={{ background: "#f5f7fb", minHeight: "100vh" }}>

      <Navbar />

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "flex-start",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              flex: "0 0 58%",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Charts />

            <Box sx={{ display: "flex", gap: 1 }}>
              <Box sx={{ flex: 7, minWidth: 0 }}>
                <OverviewCards />
              </Box>
              <Box sx={{ flex: 6, minWidth: 0 }}>
                <Insights />
              </Box>
            </Box>

          </Box>
          <Box
            sx={{
              flex: "0 0 42%",
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            <CustomTable />
          </Box>

        </Box>

      </Container>

    </Box>
  );
}

export default Dashboard;