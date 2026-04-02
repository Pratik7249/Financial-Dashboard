import { AppBar, Toolbar, Typography, Select, MenuItem, Box } from "@mui/material";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Typography variant="h6">
          Financial Dashboard
        </Typography>

        <Box>
          <Typography variant="body2" sx={{ marginRight: 1, display: "inline" }}>
            Role:
          </Typography>

          <Select size="small" defaultValue="admin" sx={{ background: "white" }}>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;