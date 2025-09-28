import { useEffect, useState, useMemo } from "react";
import { getBookings } from "../services/api";
import { Booking, Source } from "../types/types";
import DashboardLayout from "../layouts/DashboardLayout";
import { useBusStore } from "../store/busStore";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Header from "../components/Header";

export default function Analytics() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [sourceFilter, setSourceFilter] = useState<Source | "">("");

  const { seats } = useBusStore();

  useEffect(() => {
    async function fetchBookings() {
      const data = await getBookings();
      setBookings(data);
    }
    fetchBookings();
  }, []);

  const filteredBookings = sourceFilter
    ? bookings.filter((b) => b.source === sourceFilter)
    : bookings;

  const bookingsBySource = useMemo(() => {
    const counts: Record<Source, number> = {
      mmt: 0,
      goibibo: 0,
      mybus: 0,
      personal: 0,
    };
    filteredBookings.forEach((b) => counts[b.source]++);
    return Object.entries(counts).map(([source, count]) => ({ source, count }));
  }, [filteredBookings]);

  const bookingsByHour = useMemo(() => {
    const counts: Record<number, number> = Array.from(
      { length: 24 },
      (_, i) => 0
    ).reduce((acc, _, idx) => ({ ...acc, [idx]: 0 }), {});
    filteredBookings.forEach((b) => {
      const hour = parseInt(b.time.split(":")[0], 10);
      counts[hour]++;
    });
    return Object.entries(counts).map(([hour, count]) => ({
      hour: `${hour}:00`,
      count,
    }));
  }, [filteredBookings]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const exportCSV = () => {
    const csvRows = [
      [
        "ID",
        "Passenger Name",
        "Source",
        "Origin",
        "Destination",
        "Date",
        "Time",
        "Seats",
        "Fare",
        "Status",
      ],
      ...filteredBookings.map((b) => [
        b.id,
        b.passengerName,
        b.source,
        b.origin,
        b.destination,
        b.date,
        b.time,
        b.seats,
        b.fare,
        b.status,
      ]),
    ];
    const csvString = csvRows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bookings.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout
      occupiedCount={seats.filter((s) => s.occupied).length}
      totalSeats={10}
    >
      <Header />
      <div className="p-4 md:p-6 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          Analytics
        </h1>

        {/* Charts row */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Bookings by Source */}
          <div className="flex-1 h-64">
            <h2 className="text-base md:text-lg font-medium mb-2">
              Bookings by Source
            </h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingsBySource}>
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count">
                  {bookingsBySource.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Bookings Distribution */}
          <div className="flex-1 h-64">
            <h2 className="text-base md:text-lg font-medium mb-2">
              Bookings Distribution
            </h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingsBySource}
                  dataKey="count"
                  nameKey="source"
                  outerRadius={80}
                  label
                >
                  {bookingsBySource.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time-of-Day Histogram */}
        <div className="mt-6 h-64">
          <h2 className="text-base md:text-lg font-medium mb-2">
            Bookings by Hour
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bookingsByHour}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Export CSV */}
        <div className="flex justify-center md:justify-start">
          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Export CSV
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
