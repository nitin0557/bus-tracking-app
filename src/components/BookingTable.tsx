import { Booking } from "../types/types";
import React from "react";

interface BookingTableProps {
  bookings: Booking[];
  onRowClick?: (booking: Booking) => void;
}

export const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  onRowClick,
}) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium uppercase">
              ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium uppercase">
              Passenger
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium uppercase">
              Source
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium uppercase">
              Destination
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium uppercase">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((b, index) => (
            <tr
              key={b.id}
              onClick={() => onRowClick && onRowClick(b)}
              className="cursor-pointer transition transform hover:scale-105 hover:bg-gray-100 motion-safe:animate-fadeIn"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <td className="px-4 py-2">{b.id}</td>
              <td className="px-4 py-2">{b.passengerName}</td>
              <td className="px-4 py-2">{b.source}</td>
              <td className="px-4 py-2">{b.destination}</td>
              <td className="px-4 py-2">{b.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
