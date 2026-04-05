import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  Box,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Navbar({ setOpen }) {
  const { role, setRole } = useAppContext();
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1e1e1e" : "#1976d2",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="inherit" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6">
            Financial Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          
          <IconButton color="inherit" onClick={() => navigate("/")}>
            <HomeIcon />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              Role:
            </Typography>

            <Select
              size="small"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              sx={{
                minWidth: 100,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "#2c2c2c"
                    : "#ffffff",
                color: (theme) =>
                  theme.palette.mode === "dark"
                    ? "#ffffff"
                    : "#000000",
                borderRadius: 1,
              }}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="viewer">User</MenuItem>
            </Select>
          </Box>

        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;