import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { useAppContext } from "../context/AppContext";

function CustomTable() {
  const { transactions, filters, role, setTransactions } = useAppContext();

  // 🔹 Delete Handler (Admin only)
  const handleDelete = (id) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
  };

  // 🔹 Filters
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
    <Paper sx={{ m: 2, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Transactions
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>

            {/* 👑 Only for Admin */}
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

                {/* 👑 Admin Actions */}
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
              <TableCell
                colSpan={role === "admin" ? 6 : 5}
                align="center"
              >
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