import React, { useState } from "react";
import Sidebar, { RouteItem } from "../components/Sidebar";

interface DashboardLayoutProps {
  occupiedCount: number;
  totalSeats: number;
  children: React.ReactNode;
}

export default function DashboardLayout({
  occupiedCount,
  totalSeats,
  children,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar
        routes={routes}
        occupiedCount={occupiedCount}
        totalSeats={totalSeats}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

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

      <main className="flex-1 md:ml-64 p-4 md:p-6 overflow-y-auto mt-12 md:mt-0">
        {children}
      </main>
    </div>
  );
}
