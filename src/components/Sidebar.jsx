import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  {
    path: "/",
    label: "Dashboard",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    path: "/insights",
    label: "Insights",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
];

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <aside
        style={{
          position: "fixed", top: 0, left: 0, bottom: 0,
          width: "var(--sidebar-width)",
          background: "var(--bg-sidebar)",
          zIndex: 200,
          display: "flex", flexDirection: "column",
          transform: open ? "translateX(0)" : undefined,
          overflowY: "auto",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
        className={`sidebar-root${open ? " sidebar-open" : ""}`}
      >
        {/* Logo */}
        <div style={{
          padding: "22px 20px 18px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "10px",
            background: "linear-gradient(135deg, #6366f1, #4338ca)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            boxShadow: "0 4px 12px rgba(99,102,241,0.4)",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6"/>
            </svg>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "15px", fontFamily: "var(--font-display)", letterSpacing: "-0.3px" }}>
              FinTrack
            </div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "0.3px" }}>
              Financial Dashboard
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "20px 12px", flex: 1 }}>
          <div style={{
            fontSize: "9px", fontWeight: 700, color: "rgba(255,255,255,0.2)",
            letterSpacing: "1.2px", textTransform: "uppercase", padding: "0 10px", marginBottom: "8px",
          }}>
            Navigation
          </div>

          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 12px", borderRadius: "var(--radius-md)",
                  border: "none", cursor: "pointer", marginBottom: "4px",
                  background: active ? "rgba(99,102,241,0.2)" : "transparent",
                  color: active ? "#a5b4fc" : "rgba(255,255,255,0.45)",
                  fontSize: "13px", fontWeight: active ? 600 : 400,
                  fontFamily: "var(--font-body)", transition: "all 0.15s",
                  textAlign: "left",
                  outline: "none",
                  boxShadow: active ? "inset 3px 0 0 #6366f1" : "none",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = active ? "#a5b4fc" : "rgba(255,255,255,0.8)"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = active ? "#a5b4fc" : "rgba(255,255,255,0.45)"; }}
              >
                <span style={{ opacity: active ? 1 : 0.6, transition: "opacity 0.15s" }}>{item.icon}</span>
                {item.label}
                {active && (
                  <span style={{
                    marginLeft: "auto", width: 6, height: 6, borderRadius: "50%",
                    background: "#6366f1", boxShadow: "0 0 6px #6366f1",
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.15)", textAlign: "center" }}>
            © 2026 FinTrack v1.0
          </div>
        </div>
      </aside>

      <style>{`
        @media (min-width: 769px) {
          .sidebar-root {
            transform: translateX(0) !important;
          }
        }
        @media (max-width: 768px) {
          .sidebar-root {
            transform: translateX(-100%);
          }
          .sidebar-root.sidebar-open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
