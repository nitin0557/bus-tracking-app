// src/layouts/DashboardLayout.tsx
import React from "react";
import { Link } from "react-router-dom"; // or next/link if Next.js
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface DashboardLayoutProps {
  occupiedCount: number;
  totalSeats: number;
  children: React.ReactNode;
}

const COLORS = ["#22c55e", "#e5e7eb"]; // green, gray

export default function DashboardLayout({
  occupiedCount,
  totalSeats,
  children,
}: DashboardLayoutProps) {
  const data = [
    { name: "Occupied", value: occupiedCount },
    { name: "Free", value: totalSeats - occupiedCount },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Bus Dashboard</h2>
        <nav className="space-y-2">
          <Link
            to="/"
            className="block px-3 py-2 rounded hover:bg-gray-100 font-medium"
          >
            Seat Tracker
          </Link>
          <Link
            to="/reports"
            className="block px-3 py-2 rounded hover:bg-gray-100 font-medium"
          >
            Reports
          </Link>
          <Link
            to="/settings"
            className="block px-3 py-2 rounded hover:bg-gray-100 font-medium"
          >
            Settings
          </Link>
        </nav>

        <div className="mt-8">
          <h3 className="text-sm text-gray-500 mb-2">Seat Occupancy</h3>
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
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
