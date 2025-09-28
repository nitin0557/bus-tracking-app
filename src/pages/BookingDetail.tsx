import React from "react";
import { Booking } from "../types/types";

interface Props {
  booking: Booking;
}

const BookingDetail: React.FC<Props> = ({ booking }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Booking #{booking.id}</h2>
      <p>Passenger: {booking.passengerName}</p>
      <p>From: {booking.origin} To: {booking.destination}</p>
      <p>Date: {booking.date} Time: {booking.time}</p>
      <p>Seats: {booking.seats}</p>
      <p>Fare: {booking.fare}</p>
      <p>Status: {booking.status}</p>
    </div>
  );
};

export default BookingDetail;
