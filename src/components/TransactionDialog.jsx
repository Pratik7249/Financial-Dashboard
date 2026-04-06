import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import { CATEGORY_OPTIONS } from "../data/mockData";

const emptyForm = {
  amount: "",
  category: "Food",
  type: "expense",
  date: "",
  status: "success",
  description: "",
};

function formFromInitial(initial) {
  if (!initial) {
    return { ...emptyForm, date: new Date().toISOString().slice(0, 10) };
  }
  return {
    amount: String(initial.amount),
    category: initial.category,
    type: initial.type,
    date: initial.date,
    status: initial.status,
    description: initial.description ?? "",
  };
}


function TransactionDialogForm({ initial, onClose, onSave }) {
  const [form, setForm] = useState(() => formFromInitial(initial));

  const handleSubmit = () => {
    const amount = Number(form.amount);
    if (!Number.isFinite(amount) || amount <= 0) return;
    onSave({
      id: initial?.id,
      amount,
      category: form.category,
      type: form.type,
      date: form.date,
      status: form.status,
      description: form.description.trim() || undefined,
    });
    onClose();
  };

  return (
    <>
      <DialogTitle>{initial ? "Edit transaction" : "Add transaction"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Amount"
            type="number"
            required
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
            inputProps={{ min: 0, step: "0.01" }}
          />
          <TextField
            select
            label="Category"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          >
            {CATEGORY_OPTIONS.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Type"
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </TextField>
          <TextField
            label="Date"
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            select
            label="Status"
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
          >
            <MenuItem value="success">Success</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
          </TextField>
          <TextField
            label="Description"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            multiline
            minRows={2}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </>
  );
}

function TransactionDialog({ open, onClose, onSave, initial }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {open ? (
        <TransactionDialogForm
          key={initial?.id ?? "new-transaction"}
          initial={initial}
          onClose={onClose}
          onSave={onSave}
        />
      ) : null}
    </Dialog>
  );
}

export default TransactionDialog;
