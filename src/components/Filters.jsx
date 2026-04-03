import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { useAppContext } from "../context/AppContext";

function Filters() {
  const { filters, setFilters } = useAppContext();

  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      category: "",
      type: "",
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      {/* Search */}
      <TextField
        label="Search"
        size="small"
        fullWidth
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Category */}
      <Typography variant="body2">Category</Typography>
      <Select
        fullWidth
        size="small"
        value={filters.category}
        onChange={(e) => handleChange("category", e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Food">Food</MenuItem>
        <MenuItem value="Travel">Travel</MenuItem>
        <MenuItem value="Bills">Bills</MenuItem>
        <MenuItem value="Shopping">Shopping</MenuItem>
        <MenuItem value="Salary">Salary</MenuItem>
        <MenuItem value="Freelance">Freelance</MenuItem>
      </Select>

      {/* Type */}
      <Typography variant="body2">Type</Typography>
      <Select
        fullWidth
        size="small"
        value={filters.type}
        onChange={(e) => handleChange("type", e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="income">Income</MenuItem>
        <MenuItem value="expense">Expense</MenuItem>
      </Select>

      <Button variant="contained" fullWidth onClick={handleReset}>
        Reset
      </Button>
    </Box>
  );
}

export default Filters;