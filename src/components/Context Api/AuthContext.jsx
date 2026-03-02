import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// This ensures every request from now on automatically carries your cookies
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkUserStatus = async () => {
    try {
      const res = await axios.get("/api/customer/profile", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
        // Ensure this is here
        withCredentials: true,
      });

      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (err) {
      console.error("Auth Check Error:", err.response?.status);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const logout = async () => {
    try {
      await axios.post("/api/customer/logout");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, logout, checkUserStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
