import React from "react";
import { Booking } from "../types/types";

interface BookingDetailModalProps {
  booking: Booking | null;
  onClose: () => void;
}

const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  booking,
  onClose,
}) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">Booking Detail</h2>
        <div className="space-y-2">
          <p>
            <strong>ID:</strong> {booking.id}
          </p>
          <p>
            <strong>Passenger:</strong> {booking.passengerName}
          </p>
          <p>
            <strong>Source:</strong> {booking.source}
          </p>
          <p>
            <strong>Origin:</strong> {booking.origin}
          </p>
          <p>
            <strong>Destination:</strong> {booking.destination}
          </p>
          <p>
            <strong>Date:</strong> {booking.date}
          </p>
          <p>
            <strong>Time:</strong> {booking.time}
          </p>
          <p>
            <strong>Seats:</strong> {booking.seats}
          </p>
          <p>
            <strong>Fare:</strong> ${booking.fare}
          </p>
          <p>
            <strong>Status:</strong> {booking.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailModal;
