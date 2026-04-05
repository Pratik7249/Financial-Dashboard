import { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      
      <Sidebar open={open} setOpen={setOpen} />

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        
        <Navbar setOpen={setOpen} />

        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 2.5, md: 3 },
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#121212" : "#f5f7fb",
          }}
        >
          {children}
        </Box>

      </Box>

    </Box>
  );
}