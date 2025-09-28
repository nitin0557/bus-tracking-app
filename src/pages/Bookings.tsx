import { useEffect, useState, useRef, useCallback } from "react";
import { BookingTable } from "../components/BookingTable";
import Filters from "../components/Filters";
import { getBookings } from "../services/api";
import { Booking, Source } from "../types/types";
import DashboardLayout from "../layouts/DashboardLayout";
import { useBusStore } from "../store/busStore";
import BookingDetailModal from "../components/BookingDetailModal";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import SearchInput from "../common/SearchInput";
import DatePicker from "../common/DatePicker";
import Select from "../common/Select";

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [sourceFilter, setSourceFilter] = useState<Source | "">("");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [sortField, setSortField] = useState<"date" | "fare">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [visibleCount, setVisibleCount] = useState(5); // Number of bookings visible initially
  const loaderRef = useRef<HTMLDivElement>(null);

  const { seats } = useBusStore();

  useEffect(() => {
    async function fetchBookings() {
      const data = await getBookings();
      setBookings(data);
    }
    fetchBookings();
  }, []);

  // Filter by source
  let filteredBookings = sourceFilter
    ? bookings.filter((b) => b.source === sourceFilter)
    : bookings;

  // Search by passenger name or booking id
  if (searchTerm) {
    filteredBookings = filteredBookings.filter(
      (b) =>
        b.passengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.id.toString().includes(searchTerm)
    );
  }

  // Filter by date range
  if (startDate) {
    filteredBookings = filteredBookings.filter(
      (b) => new Date(b.date) >= new Date(startDate)
    );
  }
  if (endDate) {
    filteredBookings = filteredBookings.filter(
      (b) => new Date(b.date) <= new Date(endDate)
    );
  }

  // Sort bookings
  filteredBookings = filteredBookings.sort((a, b) => {
    const aValue = sortField === "date" ? new Date(a.date).getTime() : a.fare;
    const bValue = sortField === "date" ? new Date(b.date).getTime() : b.fare;
    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  // Infinite scroll observer
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setVisibleCount((prev) => prev + 10); // Load 10 more bookings
    }
  }, []);

  useEffect(() => {
    const option = { root: null, rootMargin: "20px", threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  const displayedBookings = filteredBookings.slice(0, visibleCount);

  return (
    <>
      <DashboardLayout
        occupiedCount={seats.filter((s) => s.occupied).length}
        totalSeats={10}
      >
        <Header />
        <div className="p-6 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800">Bookings</h1>

          <div className="flex flex-wrap items-center gap-4">
            {/* Source Filter */}
            <Filters sources={sourceFilter} onSourceChange={setSourceFilter} />

            <SearchInput value={searchTerm} onSearch={setSearchTerm} />

            <DatePicker value={startDate || ""} onChangeValue={setStartDate} />
            <DatePicker value={endDate || ""} onChangeValue={setEndDate} />

            <Select
              value={sortField}
              onChangeValue={(v) => setSortField(v as "date" | "fare")}
              options={[
                { value: "date", label: "Date" },
                { value: "fare", label: "Fare" },
              ]}
            />

            <Select
              value={sortOrder}
              onChangeValue={(v) => setSortOrder(v as "asc" | "desc")}
              options={[
                { value: "asc", label: "Ascending" },
                { value: "desc", label: "Descending" },
              ]}
            />

            {/* Clear Filters */}
            {(sourceFilter || searchTerm || startDate || endDate) && (
              <button
                onClick={() => {
                  setSourceFilter("");
                  setSearchTerm("");
                  setStartDate(null);
                  setEndDate(null);
                }}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600
                 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            {displayedBookings.length > 0 ? (
              <BookingTable
                bookings={displayedBookings}
                onRowClick={(booking) => setSelectedBooking(booking)}
              />
            ) : (
              <p className="text-gray-500 py-4">No bookings found.</p>
            )}
          </div>

          <div
            ref={loaderRef}
            className="h-10 flex justify-center items-center"
          >
            {visibleCount < filteredBookings.length && <Spinner />}
          </div>
        </div>
      </DashboardLayout>

      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </>
  );
}
