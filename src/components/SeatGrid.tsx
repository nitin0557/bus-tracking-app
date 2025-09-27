import React from "react";
import { SeatCard } from "./SeatCard";
import { SeatGridProps } from "../types/types";

export const SeatGrid = React.memo(
  ({ seats, onEnter, onLeave }: SeatGridProps) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {seats.map((seat) => (
          <SeatCard
            key={seat.seatNo}
            seatNo={seat.seatNo}
            occupied={seat.occupied}
            passenger={seat.passenger}
            onEnter={onEnter}
            onLeave={onLeave}
          />
        ))}
      </div>
    );
  }
);
