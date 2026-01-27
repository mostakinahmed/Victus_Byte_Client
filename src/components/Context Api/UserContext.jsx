// context/UserContext.js
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

// ✅ Create context
export const DataContext = createContext();

// ✅ Context provider component
export const UserContext = ({ children }) => {
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true); // 🔧 added
  const [error, setError] = useState(null);
  // ✅ Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes, stockRes] = await Promise.all([
          axios.get("https://api.victusbyte.com/api/product/client"),
          axios.get("https://api.victusbyte.com/api/category/client"),
          axios.get("https://api.victusbyte.com/api/stock/client"),
        ]);

        setProductData(productRes.data);
        setCategoryData(categoryRes.data);
        setStockData(stockRes.data);
      } catch (err) {
        console.error("API fetch error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const contextValue = {
    productData,
    categoryData,
    stockData,
    loading,
    error,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
