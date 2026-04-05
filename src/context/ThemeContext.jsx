import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export const ThemeProviderCustom = ({ children }) => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === "light" ? "#6366f1" : "#818cf8" },
          background: {
            default: mode === "light" ? "#f0f2f8" : "#080c18",
            paper: mode === "light" ? "#ffffff" : "#0f172a",
          },
          text: {
            primary: mode === "light" ? "#0f172a" : "#f1f5f9",
            secondary: mode === "light" ? "#64748b" : "#94a3b8",
          },
          divider: mode === "light" ? "#e2e8f0" : "#1e293b",
        },
        typography: {
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
        components: {
          MuiCssBaseline: { styleOverrides: { body: { scrollbarWidth: "thin" } } },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
