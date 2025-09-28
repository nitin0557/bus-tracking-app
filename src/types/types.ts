
export type ControlPanelProps =  {
  occupiedCount: number;
  totalSeats: number;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export type  Event =  {
  id: number;
  seatNo: number;
  action: "enter" | "leave";
  name: string;
  time: string;
}

export type EventLogProps = {
  events: Event[];
  copyToClipboard: (text: string) => void;
}

export type Passenger = {
  name: string;
  enteredAt: string;
}

export type SeatCardProps = {
  seatNo: number;
  occupied: boolean;
  passenger: Passenger | null;
  onEnter: (seatNo: number) => void; // ✅ two arguments
  onLeave: (seatNo: number) => void;
}





export type Seat =  {
  seatNo: number;
  occupied: boolean;
  passenger: Passenger | null;
}

export type SeatGridProps = {
  seats: Seat[];
  onEnter: (seatNo: number) => void;
  onLeave: (seatNo: number) => void;
}

// src/types/types.ts
export type Source = "mmt" | "goibibo" | "mybus" | "personal";

export type Booking = {
  id: number;
  passengerName: string;
  source: Source;
  origin: string;
  destination: string;
  date: string;
  time: string;
  timestamp: number;
  seats: number;
  fare: number;
  status: string;
};



export interface BusState {
  seats: Seat[];
  events: Event[];
  bookings: Booking[]; // <— add this
  setSeats: (seats: Seat[]) => void;
  setEvents: (events: Event[]) => void;
  // new methods:
  setBookings: (bookings: Booking[]) => void;
  addBooking: (booking: Booking) => void;
  // existing:
  handleEnter: (seatNo: number, passengerName: string) => void;
  handleLeave: (seatNo: number) => void;
  resetAll: () => void;
}
