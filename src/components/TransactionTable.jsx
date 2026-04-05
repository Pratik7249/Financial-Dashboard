import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Button,
  Typography,
  Box,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppContext } from "../context/useAppContext";
import TransactionDialog from "./TransactionDialog";

const fmt = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});

const statusColor = {
  success: "success",
  pending: "warning",
  failed: "error",
};

function TransactionTable() {
  const {
    visibleTransactions,
    filteredCount,
    transactions,
    sortBy,
    setSortBy,
    sortDir,
    setSortDir,
    isAdmin,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    resetFilters,
  } = useAppContext();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const requestSort = (property) => {
    if (sortBy === property) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(property);
      setSortDir(property === "date" ? "desc" : "asc");
    }
  };

  const openAdd = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setDialogOpen(true);
  };

  const handleSave = (payload) => {
    if (payload.id && editing) {
      const { id, ...rest } = payload;
      updateTransaction(id, rest);
    } else {
      const { id: _id, ...rest } = payload;
      addTransaction(rest);
    }
  };

  const emptyAll = transactions.length === 0;
  const emptyFiltered = !emptyAll && filteredCount === 0;

  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", sm: "center" }} spacing={2} sx={{ mb: 2 }}>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Transactions
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {emptyAll
              ? "No rows yet."
              : `${filteredCount} shown${filteredCount !== transactions.length ? ` of ${transactions.length}` : ""}`}
          </Typography>
        </Box>
        {isAdmin && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd} sx={{ alignSelf: { xs: "stretch", sm: "center" } }}>
            Add transaction
          </Button>
        )}
      </Stack>

      {emptyAll && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
          <Typography color="text.secondary" gutterBottom>
            There is no transaction data.
          </Typography>
          {isAdmin ? (
            <Button variant="outlined" onClick={openAdd} sx={{ mt: 1 }}>
              Add your first transaction
            </Button>
          ) : (
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
              Switch to Admin to add entries.
            </Typography>
          )}
        </Paper>
      )}

      {emptyFiltered && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: "center", borderRadius: 2, mb: 2 }}>
          <Typography color="text.secondary" gutterBottom>
            No transactions match your filters.
          </Typography>
          <Button variant="outlined" onClick={resetFilters}>
            Clear filters
          </Button>
        </Paper>
      )}

      {!emptyAll && !emptyFiltered && (
        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sortDirection={sortBy === "date" ? sortDir : false}>
                  <TableSortLabel active={sortBy === "date"} direction={sortBy === "date" ? sortDir : "asc"} onClick={() => requestSort("date")}>
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={sortBy === "category" ? sortDir : false}>
                  <TableSortLabel active={sortBy === "category"} direction={sortBy === "category" ? sortDir : "asc"} onClick={() => requestSort("category")}>
                    Category
                  </TableSortLabel>
                </TableCell>
                <TableCell>Description</TableCell>
                <TableCell sortDirection={sortBy === "type" ? sortDir : false}>
                  <TableSortLabel active={sortBy === "type"} direction={sortBy === "type" ? sortDir : "asc"} onClick={() => requestSort("type")}>
                    Type
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={sortBy === "amount" ? sortDir : false} align="right">
                  <TableSortLabel active={sortBy === "amount"} direction={sortBy === "amount" ? sortDir : "asc"} onClick={() => requestSort("amount")}>
                    Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell>Status</TableCell>
                {isAdmin && <TableCell align="right">Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleTransactions.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>
                    <Typography variant="body2" noWrap title={row.description}>
                      {row.description ?? "—"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip size="small" label={row.type} color={row.type === "income" ? "success" : "default"} variant="outlined" />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: row.type === "income" ? 600 : 500, color: row.type === "income" ? "success.main" : "text.primary" }}>
                    {row.type === "income" ? "+" : "−"}
                    {fmt.format(row.amount)}
                  </TableCell>
                  <TableCell>
                    <Chip size="small" label={row.status} color={statusColor[row.status] || "default"} variant="filled" />
                  </TableCell>
                  {isAdmin && (
                    <TableCell align="right">
                      <Button size="small" onClick={() => openEdit(row)} sx={{ mr: 1 }}>
                        Edit
                      </Button>
                      <Button size="small" color="error" onClick={() => setDeleteId(row.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TransactionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initial={editing}
      />

      <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete transaction?</DialogTitle>
        <DialogContent>
          <DialogContentText>This cannot be undone. Remove this row from your local dataset.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              if (deleteId) deleteTransaction(deleteId);
              setDeleteId(null);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TransactionTable;
