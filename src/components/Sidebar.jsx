import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useThemeContext } from "../context/ThemeContext";

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const { mode, setMode } = useThemeContext();

  const handleClick = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <Box sx={{ width: 260, p: 2 }}>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Menu
        </Typography>

        <List>
          <ListItemButton onClick={() => handleClick("/")}>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={() => handleClick("/insights")}>
            <ListItemText primary="Insights" />
          </ListItemButton>
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Theme
        </Typography>

        <Select
          fullWidth
          size="small"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
        </Select>

      </Box>
    </Drawer>
  );
}