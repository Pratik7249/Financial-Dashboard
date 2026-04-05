import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import { ThemeProviderCustom } from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProviderCustom>
        <AppProvider>
          <App />
        </AppProvider>
      </ThemeProviderCustom>
    </BrowserRouter>
  </StrictMode>
);