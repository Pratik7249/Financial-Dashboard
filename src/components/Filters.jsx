import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Stack,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppContext } from "../context/useAppContext";

function Filters() {
  const { filters, setFilters, resetFilters, categories } = useAppContext();

  const set = (key) => (e) =>
    setFilters((f) => ({ ...f, [key]: e.target.value }));

  return (
    <Box sx={{ p: 2, height: "100%" }}>
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        Filters
      </Typography>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
        Narrow the transaction list. Charts use full dataset.
      </Typography>

      <Stack spacing={2}>
        <TextField
          size="small"
          fullWidth
          label="Search"
          placeholder="ID, category, note…"
          value={filters.search}
          onChange={set("search")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Category
          </Typography>
          <Select fullWidth size="small" value={filters.category || ""} onChange={set("category")} displayEmpty>
            <MenuItem value="">All categories</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Type
          </Typography>
          <Select fullWidth size="small" value={filters.type || ""} onChange={set("type")} displayEmpty>
            <MenuItem value="">All types</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Status
          </Typography>
          <Select fullWidth size="small" value={filters.status} onChange={set("status")}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="success">Success</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Date from
          </Typography>
          <TextField type="date" fullWidth size="small" value={filters.dateFrom} onChange={set("dateFrom")} InputLabelProps={{ shrink: true }} />
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Date to
          </Typography>
          <TextField type="date" fullWidth size="small" value={filters.dateTo} onChange={set("dateTo")} InputLabelProps={{ shrink: true }} />
        </Box>

        <Button variant="outlined" fullWidth onClick={resetFilters}>
          Reset filters
        </Button>
      </Stack>
    </Box>
  );
}

export default Filters;
