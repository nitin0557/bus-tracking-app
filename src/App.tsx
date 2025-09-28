import React, { Suspense, lazy, useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./index.css";
import AppLayout from "./components/AppLayout";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const SeatTracking = lazy(() => import("./pages/SeatTracking"));
const NewDashboard = lazy(() => import("./pages/NewDashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Profile = lazy(() => import("./components/Profile"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./components/Login"));

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
          <Suspense
            fallback={<div className="text-center mt-10">{loadingText}</div>}
          >
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
                  <ProtectedRoute role="Admin">
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
                      <NewDashboard />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seattracking"
                element={
                  <ProtectedRoute>
                    <AppLayout toggleTheme={toggleTheme} currentMode={mode}>
                      <SeatTracking />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookings"
                element={
                  <ProtectedRoute>
                    <AppLayout toggleTheme={toggleTheme} currentMode={mode}>
                      <Bookings />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics/reports"
                element={
                  <ProtectedRoute>
                    <AppLayout toggleTheme={toggleTheme} currentMode={mode}>
                      <Analytics />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics/statistics"
                element={
                  <ProtectedRoute>
                    <AppLayout toggleTheme={toggleTheme} currentMode={mode}>
                      <Analytics />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings/profile"
                element={
                  <ProtectedRoute>
                    <AppLayout toggleTheme={toggleTheme} currentMode={mode}>
                      <Profile />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings/preferences"
                element={
                  <ProtectedRoute>
                    <AppLayout toggleTheme={toggleTheme} currentMode={mode}>
                      <Profile />
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
