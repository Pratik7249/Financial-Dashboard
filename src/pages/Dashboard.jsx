import { Box, Container } from "@mui/material";
import CustomTable from "../components/Table";
import OverviewCards from "../components/OverviewCards";
import Charts from "../components/Charts";
import Insights from "../components/Insights";

function Dashboard() {
  return (
    <Box sx={{ minHeight: "100vh" }}>

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "stretch",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              flex: { md: "0 0 58%" },
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Charts />

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Box sx={{ flex: 6 }}>
                <OverviewCards />
              </Box>

              <Box sx={{ flex: 5 }}>
                <Insights />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              flex: { md: "0 0 42%" },
              display: "flex",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <CustomTable />
            </Box>
          </Box>

        </Box>
      </Container>

    </Box>
  );
}

export default Dashboard;