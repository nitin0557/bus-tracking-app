import React from "react";
import { ControlPanelProps } from "../types/types";

export const ControlPanel = React.memo(
  ({
    occupiedCount,
    totalSeats,
    onExport,
    onImport,
    onReset,
  }: ControlPanelProps) => {
    return (
      <div className="flex flex-col mb-2 sm:flex-row gap-2">
        <button
          onClick={onExport}
          className="px-4 py-2 rounded bg-blue-600 text-white w-full sm:w-auto"
        >
          Export
        </button>

        <label className="px-4 py-2 rounded bg-gray-200 w-full sm:w-auto text-center cursor-pointer">
          Import
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={onImport} // ✅ already correct
          />
        </label>

        <button
          onClick={onReset} // ✅ attach handler
          className="px-4 py-2 rounded bg-red-500 text-white w-full sm:w-auto"
        >
          Reset
        </button>

        <div className="ml-auto mt-2 sm:mt-0 text-sm text-gray-600">
          Occupied: {occupiedCount} / {totalSeats}
        </div>
      </div>
    );
  }
);
