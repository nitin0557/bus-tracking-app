// src/components/EventLog.tsx
import React from "react";
import { EventLogProps } from "../types/types";

export const EventLog = React.memo(({ events, copyToClipboard }: EventLogProps) => {
  if (events.length === 0) {
    return <div className="text-gray-500">No events yet.</div>;
  }

  return (
    <div className="overflow-x-auto max-h-80">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="border px-3 py-2 text-left text-sm">Time</th>
            <th className="border px-3 py-2 text-left text-sm">Passenger Name</th>
            <th className="border px-3 py-2 text-left text-sm">Seat No</th>
            <th className="border px-3 py-2 text-left text-sm">Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev) => (
            <tr key={ev.id} className="hover:bg-gray-50">
              <td
                className="border px-3 py-2 text-xs text-gray-500 cursor-pointer"
                title="Click to copy"
                onClick={() =>
                  copyToClipboard(new Date(ev.time).toLocaleString())
                }
              >
                {new Date(ev.time).toLocaleString()}
              </td>
              <td className="border px-3 py-2 text-sm">{ev.name}</td>
              <td className="border px-3 py-2 text-sm">{ev.seatNo}</td>
              <td className="border px-3 py-2 text-sm">
                {ev.action === "enter" ? "Entered" : "Left"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
