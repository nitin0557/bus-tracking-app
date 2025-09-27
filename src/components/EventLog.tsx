import React from "react";
import { EventLogProps } from "../types/types";

export const EventLog = React.memo(
  ({ events, copyToClipboard }: EventLogProps) => {
    return (
      <div className="space-y-2 max-h-72 overflow-y-auto px-2 sm:px-0">
        {events.length === 0 && (
          <div className="text-gray-500">No events yet.</div>
        )}
        {events.map((ev) => (
          <div
            key={ev.id}
            className="p-2 border rounded flex flex-col sm:flex-row items-start sm:items-center justify-between"
          >
            <div className="text-sm">
              <div>
                <strong>{ev.name}</strong> —{" "}
                <span className="text-xs text-gray-600">seat {ev.seatNo}</span>
              </div>
              <div className="text-xs text-gray-600">
                {ev.action === "enter" ? "Entered" : "Left"}
              </div>
            </div>
            <div
              className="text-xs text-gray-500 cursor-pointer mt-1 sm:mt-0"
              title="Click to copy"
              onClick={() =>
                copyToClipboard(new Date(ev.time).toLocaleString())
              }
            >
              {new Date(ev.time).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    );
  }
);
