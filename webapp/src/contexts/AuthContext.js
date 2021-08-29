import React, { useContext, useState, useEffect } from "react";
import { auth } from "../services/auth.service";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  async function signup(email, password) {
    return await auth.register(email, password);
  }

  async function login(email, password) {
    try {
      const user = await auth.login(email, password);
      if (user) {
        setCurrentUser(user);
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  function logout() {
    setCurrentUser();
    return auth.logout();
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.roles.includes("ADMIN")) {
        setIsAdmin(true);
      }
    }
  }, [currentUser]);

  const value = {
    currentUser,
    isAdmin,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
