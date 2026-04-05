import { useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useAppContext } from "./context/useAppContext";
import Dashboard from "./pages/Dashboard";

function ThemedApp() {
  const { colorMode } = useAppContext();
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode,
          primary: { main: colorMode === "dark" ? "#a78bfa" : "#4f46e5" },
          secondary: { main: colorMode === "dark" ? "#f472b6" : "#db2777" },
          success: { main: "#16a34a" },
          error: { main: "#dc2626" },
          background: {
            default: colorMode === "dark" ? "#0f1014" : "#f4f4f7",
            paper: colorMode === "dark" ? "#16171d" : "#ffffff",
          },
        },
        shape: { borderRadius: 10 },
        typography: {
          fontFamily: '"DM Sans", system-ui, "Segoe UI", Roboto, sans-serif',
        },
      }),
    [colorMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
}

export default function App() {
  return <ThemedApp />;
}
