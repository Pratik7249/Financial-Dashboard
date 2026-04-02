import { Box, Typography, Select, MenuItem, TextField, Button } from "@mui/material";

function Filters() {
  return (
    <Box sx={{ p: 2 }}>
      
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      {/* Status */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2">Status</Typography>
        <Select fullWidth size="small" defaultValue="all">
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="success">Success</MenuItem>
          <MenuItem value="failed">Failed</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>
      </Box>

      {/* Date */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2">Date</Typography>
        <TextField type="date" fullWidth size="small" />
      </Box>

      <Button variant="contained" fullWidth>
        Reset
      </Button>

    </Box>
  );
}

export default Filters;