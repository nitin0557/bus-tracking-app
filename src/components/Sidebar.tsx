import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-4">
      <ul className="space-y-4">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/bookings">Bookings</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
