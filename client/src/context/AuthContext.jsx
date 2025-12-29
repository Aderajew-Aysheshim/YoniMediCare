import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requires2FA, setRequires2FA] = useState(false);
  const [tempToken, setTempToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });

      // If 2FA is required, store temp token and show 2FA form
      if (response.data.requires2FA) {
        setTempToken(response.data.tempToken);
        setRequires2FA(true);
        return { requires2FA: true };
      }

      // If no 2FA required, complete login
      const { token, ...userData } = response.data;
      completeLogin(token, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const verify2FA = async (code) => {
    try {
      const response = await api.post("/auth/verify-2fa", {
        tempToken,
        code
      });

      const { token, ...userData } = response.data;
      completeLogin(token, userData);
      setRequires2FA(false);
      setTempToken(null);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const completeLogin = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const register = async (userData) => {
    const response = await api.post("/auth/register", userData);
    const { token, ...user } = response.data;
    completeLogin(token, user);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loading,
      requires2FA,
      verify2FA
    }}>
      {children}
    </AuthContext.Provider>
  );
};
