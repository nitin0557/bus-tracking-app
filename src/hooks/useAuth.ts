import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";



type User = {
  role: "Manager" | "StoreKeeper";
  email: string;
} | null;

interface AuthContextType {
  user: User;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
