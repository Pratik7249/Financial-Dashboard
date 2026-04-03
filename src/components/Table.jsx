import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useAppContext } from "../context/AppContext";

function CustomTable() {
  const { transactions, filters } = useAppContext();

  // 🔹 Apply Filters
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
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
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