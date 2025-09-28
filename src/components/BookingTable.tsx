import { Booking } from "../types/types";

interface BookingTableProps {
  bookings: Booking[];
  onRowClick?: (booking: Booking) => void;
}

export const BookingTable: React.FC<BookingTableProps> = ({ bookings, onRowClick }) => {
  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="px-2 py-1 border">ID</th>
          <th className="px-2 py-1 border">Passenger</th>
          <th className="px-2 py-1 border">Source</th>
          <th className="px-2 py-1 border">Destination</th>
          <th className="px-2 py-1 border">Date</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((b) => (
          <tr
            key={b.id}
            onClick={() => onRowClick && onRowClick(b)}
            className="cursor-pointer hover:bg-gray-100"
          >
            <td className="px-2 py-1 border">{b.id}</td>
            <td className="px-2 py-1 border">{b.passengerName}</td>
            <td className="px-2 py-1 border">{b.source}</td>
            <td className="px-2 py-1 border">{b.destination}</td>
            <td className="px-2 py-1 border">{b.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
