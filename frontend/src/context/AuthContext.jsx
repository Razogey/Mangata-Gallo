import { createContext, useContext, useEffect, useState } from "react";
import {getCurrentUser, loginUser, logoutUser, refreshAccessToken} from "../api/auth";
import {clearTokens, getAccessToken, getRefreshToken, saveTokens} from "../api/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = Boolean(user);

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (!accessToken && !refreshToken) {
      setLoading(false);
      return;
    }

    try {
      if (accessToken) {
        const currentUser = await getCurrentUser(accessToken);
        setUser(currentUser);
        return;
      }

      if (refreshToken) {
        const data = await refreshAccessToken(refreshToken);

        saveTokens(data.access, refreshToken);

        const currentUser = await getCurrentUser(data.access);
        setUser(currentUser);
      }
    } catch (error) {
      console.error("Failed to restore session:", error);
      clearTokens();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(identifier, password) {
    const data = await loginUser(identifier, password);

    const { access, refresh } = data.tokens;

    saveTokens(access, refresh);

    const currentUser = await getCurrentUser(access);

    setUser(currentUser);

    return currentUser;
  }

  async function logout() {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    try {
      if (accessToken && refreshToken) {
        await logoutUser(refreshToken, accessToken);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearTokens();
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}