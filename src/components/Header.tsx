import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Bus Booking Tracker</h1>
      <nav>
        <a href="/" className="mr-4">Dashboard</a>
        <a href="/bookings">Bookings</a>
      </nav>
    </header>
  );
};

export default Header;
