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
  TablePagination,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

function CustomTable() {
  const { transactions, role, setTransactions } = useAppContext();

  const [localFilters, setLocalFilters] = useState({
    search: "",
    category: "",
    type: "",
  });

  const [filters, setFilters] = useState(localFilters);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // 🔹 Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleApply = () => {
    setFilters(localFilters);
    setPage(0); // reset to first page on filter apply
    handleClose();
  };

  const handleDelete = (id) => {
    if (role !== "admin") return;
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = transactions.filter((t) => {
    return (
      (filters.search === "" ||
        t.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.category === "" || t.category === filters.category) &&
      (filters.type === "" || t.type === filters.type)
    );
  });

  // 🔹 Paginated slice
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // 🔹 Column widths based on role
  const colWidths =
    role === "admin"
      ? {
          id: "18%",
          date: "20%",
          category: "14%",
          type: "18%",
          amount: "16%",
          actions: "17%",
        }
      : {
          id: "20%",
          date: "20%",
          category: "20%",
          type: "15%",
          amount: "15%",
        };

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "80vh",       // ⬅️ fixed height so pagination stays visible
      }}
    >

      {/* 🔹 Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, flexShrink: 0 }}>
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
        <Box
          sx={{
            p: 2,
            width: 250,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
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

      {/* 🔹 Scrollable Table Area */}
      <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        <Table sx={{ tableLayout: "fixed", width: "100%" }} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: colWidths.id }}>ID</TableCell>
              <TableCell sx={{ width: colWidths.date }}>Date</TableCell>
              <TableCell sx={{ width: colWidths.category }}>Category</TableCell>
              <TableCell sx={{ width: colWidths.type }}>Type</TableCell>
              <TableCell sx={{ width: colWidths.amount }}>Amount</TableCell>
              {role === "admin" && (
                <TableCell sx={{ width: colWidths.actions }}>Actions</TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((t) => (
                <TableRow key={t.id}>
                  <TableCell sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {t.id}
                  </TableCell>
                  <TableCell sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {t.date}
                  </TableCell>
                  <TableCell sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {t.category}
                  </TableCell>
                  <TableCell sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {t.type}
                  </TableCell>
                  <TableCell sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    ₹ {t.amount}
                  </TableCell>
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
                <TableCell colSpan={role === "admin" ? 6 : 5} align="center">
                  No transactions found 😕
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      {/* 🔹 Pagination — always pinned at bottom */}
      <Box sx={{ flexShrink: 0, borderTop: "1px solid #e0e0e0" }}>
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 7, 10]}
        />
      </Box>

    </Paper>
  );
}

export default CustomTable;