import { useAppContext } from "../context/AppContext";
import OverviewCards from "../components/OverviewCards";
import Insights from "../components/Insights";
import SuccessRatio from "../components/SuccessRatio";
import ChartsDetailed from "../components/Charts-detailed";

export default function InsightsPage() {
  const { loading } = useAppContext();

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          border: "3px solid var(--border)", borderTopColor: "var(--accent)",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }} className="animate-in">
    
      <div style={{
        background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)",
        borderRadius: "var(--radius-xl)", padding: "24px 28px", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px",
      }}>
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>
            Insights Dashboard
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)" }}>
            Deep analysis of your financial activity
          </p>
        </div>
        <div style={{ fontSize: "36px" }}>📊</div>
      </div>

  
      <OverviewCards />

  
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 320px", minWidth: 0 }}>
          <Insights />
        </div>
        <div style={{ flex: "1 1 320px", minWidth: 0 }}>
          <SuccessRatio />
        </div>
      </div>

    
      <ChartsDetailed />
    </div>
  );
}
