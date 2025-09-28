// src/services/api.ts
import { Booking } from "../types/types";

// __define-ocg__ mock API for demo
export async function getBookings(): Promise<Booking[]> {
  const varOcg: Booking[] = Array.from({ length: 55 }, (_, i) => ({
    id: i + 1,
    passengerName: `Passenger ${i + 1}`,
    source: ["mmt", "goibibo", "mybus", "personal"][i % 4] as Booking["source"],
    origin: "City A",
    destination: "City B",
    date: "2025-09-28",
    time: `${8 + (i % 12)}:00`,
    timestamp: Date.now(),
    seats: 1 + (i % 3),
    fare: 200 + i * 2,
    status: i % 2 === 0 ? "Confirmed" : "Pending",
  }));
  return Promise.resolve(varOcg);
}
