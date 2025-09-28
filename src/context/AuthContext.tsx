import React, { createContext, useState, useCallback, ReactNode } from "react";

type User = {
  role: "Admin" | "BusConductor";
  email: string;
} | null;

interface AuthContextType {
  user: User;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = React.memo(({ children }) => {
const [user, setUser] = useState<User>(() => {
  const saved = localStorage.getItem("user");
  if (!saved) return null;
  try {
    return JSON.parse(saved) as User;
  } catch (e) {
    console.warn("Failed to parse user from localStorage:", e);
    localStorage.removeItem("user"); // optional: remove invalid data
    return null;
  }
});

  const login = useCallback((email: string, password: string) => {
    if (email === "admin@mail.com" && password === "123456") {
      const userData: User = { role: "Admin", email };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    } else if (email === "conductor@mail.com" && password === "123456") {
      const userData: User = { role: "BusConductor", email };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
});
