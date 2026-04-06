import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const STATUS_STYLES = {
  success: { bg: "var(--success-bg)", color: "var(--success)", label: "Success" },
  failed: { bg: "var(--danger-bg)", color: "var(--danger)", label: "Failed" },
  pending: { bg: "var(--warning-bg)", color: "var(--warning)", label: "Pending" },
};

const TYPE_STYLES = {
  income: { color: "var(--success)" },
  expense: { color: "var(--danger)" },
};

function FilterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  );
}

const inputStyle = {
  background: "var(--bg-base)", border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)", padding: "7px 10px",
  fontSize: "12px", color: "var(--text-primary)", outline: "none",
  fontFamily: "var(--font-body)", width: "100%",
};

const selectStyle = {
  ...inputStyle, cursor: "pointer", width: "auto", minWidth: "120px",
};

export default function CustomTable() {
  const { transactions, role, setTransactions } = useAppContext();

  const [filters, setFilters] = useState({ search: "", category: "", type: "" });
  const [localFilters, setLocalFilters] = useState({ search: "", category: "", type: "" });
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [deletingId, setDeletingId] = useState(null);

  const handleApply = () => { setFilters(localFilters); setPage(0); setShowFilter(false); };
  const handleReset = () => {
    const empty = { search: "", category: "", type: "" };
    setLocalFilters(empty); setFilters(empty); setPage(0); setShowFilter(false);
  };

  const handleDelete = (id) => {
    if (role !== "admin") return;
    setDeletingId(id);
    setTimeout(() => {
      setTransactions(transactions.filter(t => t.id !== id));
      setDeletingId(null);
    }, 300);
  };

  const filteredData = transactions.filter(t =>
    (filters.search === "" || t.id.toLowerCase().includes(filters.search.toLowerCase()) || t.category.toLowerCase().includes(filters.search.toLowerCase())) &&
    (filters.category === "" || t.category === filters.category) &&
    (filters.type === "" || t.type === filters.type)
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const activeFiltersCount = [filters.search, filters.category, filters.type].filter(Boolean).length;

  return (
    <div style={{
      background: "var(--bg-surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)",
      display: "flex", flexDirection: "column", height: "100%", overflow: "hidden",
    }}>
      
      <div style={{
        padding: "16px 20px", borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px",
        flexWrap: "wrap",
      }}>
        <div>
          <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>Transactions</h3>
          <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>{filteredData.length} records</p>
        </div>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowFilter(!showFilter)}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "7px 12px", borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              background: activeFiltersCount > 0 ? "var(--accent-bg)" : "var(--bg-base)",
              color: activeFiltersCount > 0 ? "var(--accent)" : "var(--text-secondary)",
              fontSize: "12px", fontWeight: 500, cursor: "pointer",
              fontFamily: "var(--font-body)", transition: "all 0.15s",
            }}
          >
            <FilterIcon /> Filters
            {activeFiltersCount > 0 && (
              <span style={{
                background: "var(--accent)", color: "#fff", borderRadius: "99px",
                fontSize: "10px", padding: "1px 5px", fontWeight: 700,
              }}>{activeFiltersCount}</span>
            )}
          </button>


          {showFilter && (
            <div style={{
              position: "absolute", right: 0, top: "calc(100% + 6px)", zIndex: 50,
              background: "var(--bg-surface)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)", padding: "16px", width: "240px",
              boxShadow: "var(--shadow-lg)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>Filter</span>
                <button onClick={() => setShowFilter(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}>
                  <CloseIcon />
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input placeholder="Search ID or category…" value={localFilters.search}
                  onChange={e => setLocalFilters({ ...localFilters, search: e.target.value })}
                  style={inputStyle} />

                <select value={localFilters.category}
                  onChange={e => setLocalFilters({ ...localFilters, category: e.target.value })}
                  style={inputStyle}>
                  <option value="">All Categories</option>
                  {["Food", "Travel", "Bills", "Shopping", "Salary", "Freelance"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <select value={localFilters.type}
                  onChange={e => setLocalFilters({ ...localFilters, type: e.target.value })}
                  style={inputStyle}>
                  <option value="">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={handleReset} style={{
                    flex: 1, padding: "7px", border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)", background: "none",
                    color: "var(--text-secondary)", fontSize: "12px", cursor: "pointer", fontFamily: "var(--font-body)",
                  }}>
                    Reset
                  </button>
                  <button onClick={handleApply} style={{
                    flex: 1, padding: "7px", border: "none",
                    borderRadius: "var(--radius-sm)", background: "var(--accent)",
                    color: "#fff", fontSize: "12px", cursor: "pointer", fontWeight: 600,
                    fontFamily: "var(--font-body)",
                  }}>
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    
      <div style={{ flex: 1, overflowY: "auto", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", minWidth: "480px" }}>
          <thead>
            <tr style={{ background: "var(--bg-base)", position: "sticky", top: 0, zIndex: 1 }}>
              {["ID", "Date", "Category", "Type", "Amount", "Status", ...(role === "admin" ? ["Action"] : [])].map(h => (
                <th key={h} style={{
                  padding: "10px 14px", textAlign: "left",
                  fontSize: "10px", fontWeight: 600, color: "var(--text-muted)",
                  textTransform: "uppercase", letterSpacing: "0.6px",
                  borderBottom: "1px solid var(--border)",
                  whiteSpace: "nowrap",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? paginatedData.map((t, idx) => {
              const statusStyle = STATUS_STYLES[t.status] || STATUS_STYLES.pending;
              const typeStyle = TYPE_STYLES[t.type] || {};
              const isDeleting = deletingId === t.id;

              return (
                <tr key={t.id} style={{
                  borderBottom: "1px solid var(--border-light)",
                  transition: "background 0.15s, opacity 0.3s",
                  opacity: isDeleting ? 0 : 1,
                  background: "transparent",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg-base)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "11px 14px", color: "var(--text-secondary)", fontFamily: "monospace", fontSize: "12px", whiteSpace: "nowrap" }}>
                    {t.id}
                  </td>
                  <td style={{ padding: "11px 14px", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                    {t.date}
                  </td>
                  <td style={{ padding: "11px 14px", color: "var(--text-primary)", fontWeight: 500, whiteSpace: "nowrap" }}>
                    {t.category}
                  </td>
                  <td style={{ padding: "11px 14px", whiteSpace: "nowrap" }}>
                    <span style={{
                      fontSize: "11px", fontWeight: 600,
                      color: typeStyle.color, textTransform: "capitalize",
                    }}>
                      {t.type === "income" ? "↑" : "↓"} {t.type}
                    </span>
                  </td>
                  <td style={{ padding: "11px 14px", fontWeight: 700, color: typeStyle.color, whiteSpace: "nowrap" }}>
                    {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString("en-IN")}
                  </td>
                  <td style={{ padding: "11px 14px", whiteSpace: "nowrap" }}>
                    <span style={{
                      fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "99px",
                      background: statusStyle.bg, color: statusStyle.color,
                    }}>
                      {statusStyle.label}
                    </span>
                  </td>
                  {role === "admin" && (
                    <td style={{ padding: "11px 14px" }}>
                      <button
                        onClick={() => handleDelete(t.id)}
                        style={{
                          display: "flex", alignItems: "center", gap: "4px",
                          padding: "5px 10px", borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--danger-bg)",
                          background: "var(--danger-bg)", color: "var(--danger)",
                          fontSize: "11px", fontWeight: 600, cursor: "pointer",
                          fontFamily: "var(--font-body)", transition: "all 0.15s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "var(--danger)"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "var(--danger-bg)"; e.currentTarget.style.color = "var(--danger)"; }}
                      >
                        <TrashIcon /> Delete
                      </button>
                    </td>
                  )}
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={role === "admin" ? 7 : 6} style={{
                  padding: "40px", textAlign: "center",
                  color: "var(--text-muted)", fontSize: "13px",
                }}>
                  <div style={{ fontSize: "28px", marginBottom: "8px" }}>🔍</div>
                  No transactions match your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

  
      <div style={{
        padding: "12px 20px", borderTop: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "10px", flexWrap: "wrap",
        background: "var(--bg-surface)",
      }}>
        <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          Showing {page * rowsPerPage + 1}–{Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <select value={rowsPerPage} onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(0); }}
            style={{ ...selectStyle, minWidth: "auto", padding: "5px 8px" }}>
            {[5, 7, 10, 15].map(n => <option key={n} value={n}>{n} / page</option>)}
          </select>

          <button disabled={page === 0} onClick={() => setPage(p => p - 1)}
            style={{
              padding: "5px 10px", borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)", background: "none",
              color: page === 0 ? "var(--text-muted)" : "var(--text-primary)",
              cursor: page === 0 ? "not-allowed" : "pointer", fontSize: "13px",
            }}>‹</button>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const p = Math.max(0, Math.min(page - 2, totalPages - 5)) + i;
            return (
              <button key={p} onClick={() => setPage(p)} style={{
                padding: "5px 10px", borderRadius: "var(--radius-sm)", fontSize: "13px",
                border: "1px solid", cursor: "pointer",
                borderColor: p === page ? "var(--accent)" : "var(--border)",
                background: p === page ? "var(--accent)" : "none",
                color: p === page ? "#fff" : "var(--text-primary)",
                fontWeight: p === page ? 600 : 400,
              }}>{p + 1}</button>
            );
          })}

          <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}
            style={{
              padding: "5px 10px", borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)", background: "none",
              color: page >= totalPages - 1 ? "var(--text-muted)" : "var(--text-primary)",
              cursor: page >= totalPages - 1 ? "not-allowed" : "pointer", fontSize: "13px",
            }}>›</button>
        </div>
      </div>
    </div>
  );
}
