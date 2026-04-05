import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InsightsPage from "./pages/InsightsPage";
import Layout from "./components/Layout";

export default function App() {
  return (
    // <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </Layout>
    // </BrowserRouter>
  );
}