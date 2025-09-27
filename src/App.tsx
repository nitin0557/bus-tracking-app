import React, { Suspense, lazy, useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./index.css";
import AppLayout from "./components/AppLayout";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const Login = lazy(() => import("./components/Login"));
const Dashboard = lazy(() => import("./pages/Dasboard"));
const Home = lazy(() => import("./pages/Home"));

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("light"); // <-- theme mode state

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode, // <-- dynamic mode
          primary: { main: "#1976d2" },
          secondary: { main: "#9c27b0" },
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const loadingText = "loading...";

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Suspense fallback={<div>{loadingText}</div>}>
            {/* Example: Pass toggleTheme to AppLayout or Header */}
            <Routes>
              <Route
                path="/"
                element={
                  <AppLayout toggleTheme={toggleTheme} currentMode={mode}>
                    <Login />
                  </AppLayout>
                }
              />
              <Route
                path="/home"
                element={
                  <ProtectedRoute role="Manager">
                    <AppLayout toggleTheme={toggleTheme} currentMode={mode}>
                      <Home />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <AppLayout toggleTheme={toggleTheme} currentMode={mode}>
                      <Dashboard />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}
