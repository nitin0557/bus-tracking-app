import React from "react";
import { SeatCardProps } from "../types/types";

export const SeatCard = React.memo(
  ({ seatNo, occupied, passenger, onEnter, onLeave }: SeatCardProps) => {
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
            className="flex-1 px-3 py-2 rounded bg-indigo-600 text-white text-sm sm:text-base"
            onClick={() => {
              if (!occupied) {
                const name = prompt("Passenger name:", "");
                if (!name) return;
                onEnter(seatNo, name); // Pass seatNo + passengerName
              }
            }}
          >
            Enter
          </button>
          <button
            className="flex-1 px-3 py-2 rounded bg-amber-500 text-black text-sm sm:text-base"
            onClick={() => {
              if (occupied) {
                onLeave(seatNo); // Only seatNo needed for leave
              }
            }}
          >
            Leave
          </button>
        </div>
      </div>
    );
  }
);
