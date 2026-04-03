import { createContext, useContext, useState } from "react";
import transactionsData from "../data/mockData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  
  // 🔹 Transactions State
  const [transactions, setTransactions] = useState(transactionsData);

  // 🔹 Role State
  const [role, setRole] = useState("admin"); // admin / viewer

  // 🔹 Filters State
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    type: "",
  });

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        role,
        setRole,
        filters,
        setFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook (clean usage)
export const useAppContext = () => useContext(AppContext);