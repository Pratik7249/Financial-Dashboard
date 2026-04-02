import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

function CustomTable() {
  return (
    <Paper sx={{ m: 2 }}>
      <Table>
        
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>₹500</TableCell>
            <TableCell>Success</TableCell>
            <TableCell>2026-04-02</TableCell>
            <TableCell>
              <Button color="error" variant="contained" size="small">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>

      </Table>
    </Paper>
  );
}

export default CustomTable;