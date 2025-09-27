// src/components/PassengerModal.tsx
import React, { useState, useEffect } from "react";

interface PassengerModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; phone: string; city: string }) => void;
}

interface City {
  id: string;
  name: string;
  country: string;
}

export const PassengerModal: React.FC<PassengerModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    setLoading(true);
    fetch(
      "https://countriesnow.space/api/v0.1/countries",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY", // replace with your API key
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setCities(data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, phone, city });
    setName("");
    setPhone("");
    setCity("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Add Passenger</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">City</label>
            {loading ? (
              <p className="text-sm text-gray-500">Loading cities...</p>
            ) : (
              <select
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c.id} value={c?.country}>
                    {c?.country}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
