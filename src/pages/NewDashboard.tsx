import { useEffect, useState } from "react";
import KPI from "../components/KPI";
import {BookingTable} from "../components/BookingTable";
import { getBookings } from "../services/api";
import { Booking } from "../types/types";
import DashboardLayout from "../layouts/DashboardLayout";
import { useBusStore } from "../store/busStore";
import Header from "../components/Header";


export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
    const {
      seats,
      events,
      handleEnter,
      handleLeave,
      resetAll,
      setSeats,
      setEvents,
    } = useBusStore();
  
    const SEAT_COUNT = 10;

useEffect(() => {
  getBookings().then((data) => {
    // Map each booking to ensure TypeScript type matches
    const mappedBookings: Booking[] = data.map((b) => ({
      ...b,
      source: b.source as Booking["source"], // typecast string to Source
    }));
    setBookings(mappedBookings);
  });
}, []);


  const totalBookings = bookings.length;
  const bookingsToday = bookings.filter(
    (b) => b.date === "2025-09-28"
  ).length;

  return (
    <DashboardLayout
      occupiedCount={seats.filter((s) => s.occupied).length}
      totalSeats={SEAT_COUNT}
    >
      <Header/>
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI title="Total Bookings" value={totalBookings} />
        <KPI title="Bookings Today" value={bookingsToday} />
      </div>
      <BookingTable bookings={bookings} />
    </div>
    </DashboardLayout>
  );
}
