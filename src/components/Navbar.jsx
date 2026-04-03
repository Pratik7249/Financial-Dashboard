import { AppBar, Toolbar, Typography, Select, MenuItem, Box } from "@mui/material";
import { useAppContext } from "../context/AppContext";

function Navbar() {
  const { role, setRole } = useAppContext();

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Typography variant="h6">
          Transaction Dashboard
        </Typography>

        <Box>
          <Typography variant="body2" sx={{ mr: 1, display: "inline" }}>
            Role:
          </Typography>

          <Select
            size="small"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{ background: "white" }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="viewer">Viewer</MenuItem>
          </Select>
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;