import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useState } from "react";
import { useAppContext } from "../context/useAppContext";

function Navbar() {
  const {
    role,
    setRole,
    colorMode,
    setColorMode,
    isAdmin,
    exportCsv,
    exportJson,
  } = useAppContext();

  const [exportAnchor, setExportAnchor] = useState(null);

  return (
    <AppBar position="sticky" elevation={0} color="default" sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Toolbar sx={{ gap: 2, flexWrap: "wrap", py: 1 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Finance Dashboard
        </Typography>

        <ToggleButtonGroup
          size="small"
          exclusive
          value={colorMode}
          onChange={(_, v) => v && setColorMode(v)}
          aria-label="theme"
        >
          <ToggleButton value="light">Light</ToggleButton>
          <ToggleButton value="dark">Dark</ToggleButton>
        </ToggleButtonGroup>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="viewer">Viewer (read-only)</MenuItem>
            <MenuItem value="admin">Admin (edit data)</MenuItem>
          </Select>
        </FormControl>

        {isAdmin && (
          <>
            <Tooltip title="Export data">
              <IconButton
                color="inherit"
                onClick={(e) => setExportAnchor(e.currentTarget)}
                aria-label="export"
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={exportAnchor}
              open={Boolean(exportAnchor)}
              onClose={() => setExportAnchor(null)}
            >
              <MenuItem
                onClick={() => {
                  exportCsv();
                  setExportAnchor(null);
                }}
              >
                <ListItemText primary="Download CSV" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  exportJson();
                  setExportAnchor(null);
                }}
              >
                <ListItemText primary="Download JSON" />
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
