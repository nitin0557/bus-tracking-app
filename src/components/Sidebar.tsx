import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#22c55e", "#e5e7eb"]; // green, gray

export interface RouteItem {
  path: string;
  label: string;
  children?: RouteItem[];
}

interface SidebarProps {
  routes: RouteItem[];
  occupiedCount: number;
  totalSeats: number;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({
  routes,
  occupiedCount,
  totalSeats,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = React.useState<{ [key: string]: boolean }>(
    {}
  );

  const showSeatOccupancy = location.pathname === "/seattracking";

  const data = [
    { name: "Occupied", value: occupiedCount },
    { name: "Free", value: totalSeats - occupiedCount },
  ];

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
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-black text-white shadow-md transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block z-30`}
    >
      <nav className="mt-12 p-4 space-y-1">{renderRoutes(routes)}</nav>

      {showSeatOccupancy && (
        <div className="p-4 mt-auto">
          <h3 className="text-sm font-semibold mb-2 text-white">
            Seat Occupancy
          </h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </aside>
  );
}
