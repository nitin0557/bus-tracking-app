import { create } from "zustand";
import { BusState, Event, Seat } from "./types";

export const useBusStore = create<BusState>((set, get) => {
  const SEAT_COUNT = 10;

  const makeInitialSeats = (): Seat[] =>
    Array.from({ length: SEAT_COUNT }, (_, i) => ({
      seatNo: i + 1,
      occupied: false,
      passenger: null,
    }));

  return {
    seats:
      JSON.parse(localStorage.getItem("bus_seats_v1") || "null") ||
      makeInitialSeats(),
    events: JSON.parse(localStorage.getItem("bus_events_v1") || "null") || [],

    setSeats: (seats) => {
      localStorage.setItem("bus_seats_v1", JSON.stringify(seats));
      set({ seats });
    },

    setEvents: (events) => {
      localStorage.setItem("bus_events_v1", JSON.stringify(events));
      set({ events });
    },

    handleEnter: (seatNo: number, passengerName: string) => {
      const seats = get().seats.map((s) =>
        s.seatNo === seatNo
          ? {
              ...s,
              occupied: true,
              passenger: {
                name: passengerName,
                enteredAt: new Date().toISOString(),
              },
            }
          : s
      );
      get().setSeats(seats);

      const newEvent: Event = {
        id: Date.now(),
        seatNo,
        action: "enter",
        name: passengerName,
        time: new Date().toISOString(),
      };
      get().setEvents([newEvent, ...get().events]);
    },

    handleLeave: (seatNo: number) => {
      const seat = get().seats.find((s) => s.seatNo === seatNo);
      if (!seat || !seat.occupied) return;

      const passengerName = seat.passenger?.name ?? "(unknown)";
      const seats = get().seats.map((s) =>
        s.seatNo === seatNo ? { ...s, occupied: false, passenger: null } : s
      );
      get().setSeats(seats);

      const newEvent: Event = {
        id: Date.now(),
        seatNo,
        action: "leave",
        name: passengerName,
        time: new Date().toISOString(),
      };
      get().setEvents([newEvent, ...get().events]);
    },

    resetAll: () => {
      const initialSeats = Array.from({ length: 10 }, (_, i) => ({
        seatNo: i + 1,
        occupied: false,
        passenger: null,
      }));
      set({ seats: initialSeats, events: [] });
      localStorage.removeItem("bus_seats_v1");
      localStorage.removeItem("bus_events_v1");
    },
  };
});
