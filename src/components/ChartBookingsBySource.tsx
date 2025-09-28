import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

type ChartData = {
  name: string;
  value: number;
  [key: string]: any; // <-- add this
};

interface Props {
  data: ChartData[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ChartBookingsBySource: React.FC<Props> = ({ data }) => {
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default ChartBookingsBySource;
