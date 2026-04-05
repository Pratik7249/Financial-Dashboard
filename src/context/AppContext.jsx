import { createContext, useContext, useState,useEffect } from "react";
import transactionsData from "../data/mockData";
import { fetchTransactions } from "../services/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  // Transactions State
  // const [transactions, setTransactions] = useState(transactionsData);

  // Role State
  const [role, setRole] = useState("admin");

  // Filters State
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    type: "",
  });
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions().then((data) => {
      setTransactions(data);
      setLoading(false);
    });
  }, []);

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