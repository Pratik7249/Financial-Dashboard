import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import { useAppContext } from "../context/AppContext";

const COLORS = ["#4caf50", "#f44336", "#ff9800"];

export default function SuccessRatio() {
  const { transactions } = useAppContext();

  const success = transactions.filter(t => t.status === "success").length;
  const failed = transactions.filter(t => t.status === "failed").length;
  const pending = transactions.filter(t => t.status === "pending").length;

  const data = [
    { name: "Success", value: success },
    { name: "Failed", value: failed },
    { name: "Pending", value: pending },
  ];

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Transaction Status Ratio
        </Typography>

        <ResponsiveContainer width={300} height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

      </CardContent>
    </Card>
  );
}