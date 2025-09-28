import { Booking } from "../types/types";

export async function getBookings(): Promise<Booking[]> {
  const varOcg: Booking[] = Array.from({ length: 55 }, (_, i) => {
    // Create a new date and add i days
    const bookingDate = new Date();
    bookingDate.setDate(bookingDate.getDate() + i); // Increment date by i days
    const formattedDate = bookingDate.toISOString().split("T")[0]; // YYYY-MM-DD format

    return {
      id: i + 1,
      passengerName: `Passenger ${i + 1}`,
      source: ["mmt", "goibibo", "mybus", "personal"][i % 4] as Booking["source"],
      origin: "City A",
      destination: "City B",
      date: formattedDate,
      time: `${8 + (i % 12)}:00`,
      timestamp: Date.now(),
      seats: 1 + (i % 3),
      fare: 200 + i * 2,
      status: i % 2 === 0 ? "Confirmed" : "Pending",
    };
  });

  return Promise.resolve(varOcg);
}
