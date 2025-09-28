// src/components/Filters.tsx
import { Source } from "../types/types";

export interface FiltersProps {
  sources: Source | ""; // current selected value
  onSourceChange: (value: Source | "") => void; // match the type of setSourceFilter
}

const Filters: React.FC<FiltersProps> = ({ sources, onSourceChange }) => {
  return (
    <select
      value={sources}
      onChange={(e) => onSourceChange(e.target.value as Source | "")} // cast string to Source | ""
      className="border p-2 rounded"
    >
      <option value="">All</option>
      <option value="mmt">MMT</option>
      <option value="goibibo">Goibibo</option>
      <option value="mybus">MyBus</option>
      <option value="personal">Personal</option>
    </select>
  );
};

export default Filters;
