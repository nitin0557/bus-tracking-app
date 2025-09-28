import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface DashboardLayoutProps {
  occupiedCount: number;
  totalSeats: number;
  children: React.ReactNode;
}

const COLORS = ["#22c55e", "#e5e7eb"]; // green, gray

interface RouteItem {
  path: string;
  label: string;
  children?: RouteItem[];
}

export default function DashboardLayout({
  occupiedCount,
  totalSeats,
  children,
}: DashboardLayoutProps) {
  const location = useLocation();
  const showSeatOccupancy = location.pathname === "/seattracking";

  const data = [
    { name: "Occupied", value: occupiedCount },
    { name: "Free", value: totalSeats - occupiedCount },
  ];

  const routes: RouteItem[] = [
    { path: "/dashboard", label: "Home" },
    { path: "/seattracking", label: "Seat Tracker" },
    { path: "/bookings", label: "Bookings List" },
    {
      path: "/analytics",
      label: "Analytics",
      children: [
        { path: "/analytics/reports", label: "Reports" },
        { path: "/analytics/statistics", label: "Statistics" },
      ],
    },
    {
      path: "/settings",
      label: "Settings",
      children: [
        { path: "/settings/profile", label: "Profile" },
        { path: "/settings/preferences", label: "Preferences" },
      ],
    },
  ];

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (path: string) => {
    setOpenMenus((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const renderRoutes = (routes: RouteItem[], level = 0) =>
    routes.map((route) => {
      const isActive = location.pathname === route.path;
      const hasChildren = route.children && route.children.length > 0;
      const isOpen = openMenus[route.path];

      return (
        <div key={route.path} className="flex flex-col">
          {/* Parent route */}
          <div
            className={`flex justify-between items-center cursor-pointer px-3 py-2 rounded font-medium text-left transition-all duration-300
              ${isActive ? "bg-gray-200 text-black shadow-lg" : "text-white hover:bg-gray-200 hover:text-black"}
              ${level > 0 ? "ml-4" : ""}
            `}
          >
            {/* If it has children, clicking toggles */}
            {hasChildren ? (
              <span
                onClick={() => toggleMenu(route.path)}
                className="flex justify-between w-full"
              >
                <span>{route.label}</span>
                <span className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}>
                  ▶
                </span>
              </span>
            ) : (
              // Leaf route navigates
              <Link to={route.path} className="w-full">
                {route.label}
              </Link>
            )}
          </div>

          {/* Nested routes */}
          {hasChildren && isOpen && (
            <div className="flex flex-col ml-4 mt-1 space-y-1">
              {renderRoutes(route.children!, level + 1)}
            </div>
          )}
        </div>
      );
    });

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-black via-gray-800 to-gray-700 shadow-lg p-4 flex flex-col transition-all duration-500 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-white text-center md:text-left animate-pulse">
          Bus Dashboard
        </h2>
        <nav className="space-y-2 flex flex-col justify-start">{renderRoutes(routes)}</nav>

        {/* Conditionally render seat occupancy chart */}
        {showSeatOccupancy && (
          <div className="mt-8">
            <h3 className="text-sm text-white mb-2 text-center md:text-left">
              Seat Occupancy
            </h3>
            <div className="w-full h-40">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-4 md:p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
