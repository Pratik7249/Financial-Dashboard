import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-base)" }}>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

     
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 199,
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)",
          }}
        />
      )}

  
      <div className="layout-main">
        <Navbar setOpen={setSidebarOpen} />
        <main style={{ flex: 1, padding: "20px", overflowX: "hidden" }}>
          {children}
        </main>
      </div>

      <style>{`
        .layout-main {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
          margin-left: var(--sidebar-width);
          transition: margin-left 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        @media (max-width: 768px) {
          .layout-main {
            margin-left: 0 !important;
          }
        }
        @media (max-width: 480px) {
          .layout-main > main {
            padding: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}
