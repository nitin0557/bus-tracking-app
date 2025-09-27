import React, { useCallback } from "react";
import { ControlPanel } from "./components/ControlPanel";
import { SeatGrid } from "./components/SeatGrid";
import { EventLog } from "./components/EventLog";
import { useBusStore } from "./store/busStore";

export default function App() {
  const {
    seats,
    events,
    handleEnter,
    handleLeave,
    resetAll,
    setSeats,
    setEvents,
  } = useBusStore();

  const SEAT_COUNT = 10;

  const copyToClipboard = useCallback(
    (text: string) => navigator.clipboard?.writeText(text).catch(console.error),
    []
  );

const handleSeatEnter = useCallback(
  (seatNo: number) => {
    const name = prompt("Passenger name:", "");
    if (!name) return;
    handleEnter(seatNo, name);
  },
  [handleEnter]
);
  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify({ seats, events }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bus-data-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [seats, events]);

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (parsed.seats && parsed.events) {
          setSeats(parsed.seats);
          setEvents(parsed.events);
          alert("Imported successfully");
        } else alert("Invalid format");
      } catch {
        alert("Failed to parse file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">
            Bus Conductor — Seat Tracker (10 seats)
          </h1>
          <p className="text-sm text-gray-600">
            Track when passengers enter or leave each seat. State persists in
            localStorage.
          </p>
        </header>

        <section className="bg-white rounded-lg shadow p-4 mb-6">
          <ControlPanel
            occupiedCount={seats.filter((s) => s.occupied).length}
            totalSeats={SEAT_COUNT}
            onExport={exportData}
            onImport={importData}
            onReset={resetAll}
          />
          <SeatGrid
            seats={seats}
            onEnter={handleSeatEnter}
            onLeave={handleLeave}
          />
        </section>

        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-3">Event Log</h2>
          <div className="mb-3 text-sm text-gray-600">
            Latest events appear at top. Click an event's time to copy it.
          </div>
          <EventLog events={events} copyToClipboard={copyToClipboard} />
        </section>

        <footer className="mt-6 text-xs text-gray-500">
          Tip: Use the Export button to save logs before resetting.
        </footer>
      </div>
    </div>
  );
}
