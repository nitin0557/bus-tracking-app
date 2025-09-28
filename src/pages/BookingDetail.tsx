import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Booking } from "../types/types";

interface Props {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: "50%", scale: 0.8 },
  visible: { opacity: 1, y: "0%", scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: "50%", scale: 0.8, transition: { duration: 0.2 } },
};

const BookingDetailModal: React.FC<Props> = ({ booking, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-96 relative overflow-x-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">Booking #{booking.id}</h2>

            {/* Table for Booking Details */}
            <table className="table-auto w-full text-left border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-semibold">Passenger</td>
                  <td className="py-2">{booking.passengerName}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">From</td>
                  <td className="py-2">{booking.origin}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">To</td>
                  <td className="py-2">{booking.destination}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">Date</td>
                  <td className="py-2">{booking.date}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">Time</td>
                  <td className="py-2">{booking.time}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">Seats</td>
                  <td className="py-2">{booking.seats}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-semibold">Fare</td>
                  <td className="py-2">{booking.fare}</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold">Status</td>
                  <td className="py-2">{booking.status}</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingDetailModal;
