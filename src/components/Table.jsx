import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  IconButton,
  Popover,
  Box,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

function CustomTable() {
  const { transactions, role, setTransactions } = useAppContext();

  // 🔹 Local filter state (inside popup)
  const [localFilters, setLocalFilters] = useState({
    search: "",
    category: "",
    type: "",
  });

  const [filters, setFilters] = useState(localFilters);

  // 🔹 Popover control
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // 🔹 Apply Filters
  const handleApply = () => {
    setFilters(localFilters);
    handleClose();
  };

  // 🔹 Delete
  const handleDelete = (id) => {
    if (role !== "admin") return;
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
  };

  // 🔹 Filter logic
  const filteredData = transactions.filter((t) => {
    return (
      (filters.search === "" ||
        t.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.category === "" || t.category === filters.category) &&
      (filters.type === "" || t.type === filters.type)
    );
  });

  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      
      {/* 🔹 Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Transactions</Typography>

        <IconButton onClick={handleOpen}>
          <FilterListIcon />
        </IconButton>
      </Box>

      {/* 🔹 Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 2, width: 250, display: "flex", flexDirection: "column", gap: 2 }}>
          
          <TextField
            label="Search"
            size="small"
            value={localFilters.search}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, search: e.target.value })
            }
          />

          <Select
            size="small"
            value={localFilters.category}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, category: e.target.value })
            }
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
            <MenuItem value="Bills">Bills</MenuItem>
            <MenuItem value="Shopping">Shopping</MenuItem>
            <MenuItem value="Salary">Salary</MenuItem>
            <MenuItem value="Freelance">Freelance</MenuItem>
          </Select>

          <Select
            size="small"
            value={localFilters.type}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, type: e.target.value })
            }
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>

          <Button variant="contained" onClick={handleApply}>
            Apply
          </Button>

        </Box>
      </Popover>

      {/* 🔹 Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            {role === "admin" && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{t.id}</TableCell>
                <TableCell>{t.date}</TableCell>
                <TableCell>{t.category}</TableCell>
                <TableCell>{t.type}</TableCell>
                <TableCell>₹ {t.amount}</TableCell>

                {role === "admin" && (
                  <TableCell>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No transactions found 😕
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default CustomTable;