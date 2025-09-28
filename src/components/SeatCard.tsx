import React, { useCallback } from "react";
import { SeatCardProps } from "../types/types";

export const SeatCard = React.memo(
  ({ seatNo, occupied, passenger, onEnter, onLeave }: SeatCardProps) => {
    const handleEnterClick = useCallback(() => {
      if (!occupied) onEnter(seatNo); // just notify parent
    }, [occupied, seatNo, onEnter]);

    const handleLeaveClick = useCallback(() => {
      if (occupied) onLeave(seatNo);
    }, [occupied, seatNo, onLeave]);

    return (
      <div
        className={`p-3 rounded border ${
          occupied ? "border-green-500 bg-green-50" : "border-gray-200 bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <strong>Seat {seatNo}</strong>
          <span className="text-xs text-gray-500">
            {occupied ? "Occupied" : "Empty"}
          </span>
        </div>
        <div className="text-sm mb-3">
          {occupied ? (
            <>
              <div className="truncate">Name: {passenger?.name}</div>
              <div className="text-xs text-gray-500">
                In: {new Date(passenger!.enteredAt).toLocaleString()}
              </div>
            </>
          ) : (
            <div className="text-gray-500">No passenger</div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleEnterClick}
            className="flex-1 px-2 py-1 rounded bg-indigo-600 text-white"
          >
            Enter
          </button>
          <button
            onClick={handleLeaveClick}
            className="flex-1 px-2 py-1 rounded bg-amber-500 text-black"
          >
            Leave
          </button>
        </div>
      </div>
    );
  }
);
