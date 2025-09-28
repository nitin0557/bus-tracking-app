import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
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
  const navigate = useNavigate();
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
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile toggle

  const toggleMenu = (path: string) => {
    setOpenMenus((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const handleNavigate = (path: string, hasChildren: boolean) => {
    if (hasChildren) {
      toggleMenu(path);
    } else {
      navigate(path);
      setSidebarOpen(false); // auto close on mobile
    }
  };

  const renderRoutes = (routes: RouteItem[], level = 0) =>
    routes.map((route) => {
      const isActive = location.pathname === route.path;
      const hasChildren: boolean = !!(
        route.children && route.children.length > 0
      );
      const isOpen = openMenus[route.path];

      return (
        <div key={route.path} className="flex flex-col">
          <button
            className={`flex justify-between items-center cursor-pointer px-3 py-2 rounded font-medium text-left transition-all duration-300 w-full
              ${
                isActive
                  ? "bg-gray-200 text-black shadow-lg"
                  : "text-white hover:bg-gray-200 hover:text-black"
              }
              ${level > 0 ? "ml-4" : ""}
            `}
            onClick={() => handleNavigate(route.path, hasChildren)}
          >
            <span>{route.label}</span>
            {hasChildren && (
              <span
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-90" : ""
                }`}
              >
                ▶
              </span>
            )}
          </button>

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
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-black text-white flex items-center justify-between px-4 py-3">
        <h2 className="text-lg font-bold">Bus Dashboard</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-black via-gray-800 to-gray-700 shadow-lg p-4 flex flex-col transition-transform duration-300 overflow-y-auto z-30
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6 text-white text-center md:text-left animate-pulse hidden md:block">
          Bus Dashboard
        </h2>
        <nav className="space-y-2 flex flex-col justify-start">
          {renderRoutes(routes)}
        </nav>

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
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-64 p-4 md:p-6 overflow-y-auto mt-12 md:mt-0">
        {children}
      </main>
    </div>
  );
}
