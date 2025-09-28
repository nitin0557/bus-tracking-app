import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
      <h1 className="text-xl font-bold text-center md:text-left">
        Bus Booking Tracker
      </h1>
      <nav className="flex justify-center md:justify-end space-x-4">
        <a href="/" className="hover:underline">Dashboard</a>
        <a href="/bookings" className="hover:underline">Bookings</a>
      </nav>
    </header>
  );
};

export default Header;
