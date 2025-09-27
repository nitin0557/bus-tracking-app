
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
  onEnter: (seatNo: number, passengerName: string) => void; // ✅ two arguments
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
