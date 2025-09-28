// src/components/Filters.tsx
import { Source } from "../types/types";

export interface FiltersProps {
  sources: Source | ""; // current selected value
  onSourceChange: (value: Source | "") => void; // match the type of setSourceFilter
}

const Filters: React.FC<FiltersProps> = ({ sources, onSourceChange }) => {
  return (
    <div className="inline-block relative">
      <select
        value={sources}
        onChange={(e) => onSourceChange(e.target.value as Source | "")} // cast string to Source | ""
        className="appearance-none border border-gray-300 bg-gradient-to-r from-gray-800 via-gray-700 to-black text-white p-2 rounded-lg pr-8 cursor-pointer
                   transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All</option>
        <option value="mmt">MMT</option>
        <option value="goibibo">Goibibo</option>
        <option value="mybus">MyBus</option>
        <option value="personal">Personal</option>
      </select>
      {/* Dropdown arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg
          className="w-4 h-4 text-white transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default Filters;
