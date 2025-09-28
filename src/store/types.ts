export type Passenger = {
  name: string;
  enteredAt: string;
};

export type Seat = {
  seatNo: number;
  occupied: boolean;
  passenger: Passenger | null;
};

export type Event = {
  id: number;
  seatNo: number;
  action: "enter" | "leave";
  name: string;
  time: string;
};

export type BusState = {
  seats: Seat[];
  events: Event[];
  setSeats: (seats: Seat[]) => void;
  setEvents: (events: Event[]) => void;
  handleEnter: (seatNo: number, passengerName: string) => void;
  handleLeave: (seatNo: number) => void;
  resetAll: () => void;
};
