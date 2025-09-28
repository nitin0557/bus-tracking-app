import React from "react";

// __define-ocg__ This is the homepage for the Bus Service application
const Home = () => {
  const varOcg = [
    {
      id: 1,
      route: "Delhi to Jaipur",
      time: "07:00 AM",
      price: "₹500",
      image:
        "https://as2.ftcdn.net/v2/jpg/04/85/66/09/1000_F_485660926_oZUh9mVD8QHwGoWw61VJD7AU7J4iTOkW.jpg",
    },
    {
      id: 2,
      route: "Jaipur to Agra",
      time: "09:00 AM",
      price: "₹400",
      image:
        "https://as2.ftcdn.net/v2/jpg/04/85/66/09/1000_F_485660926_oZUh9mVD8QHwGoWw61VJD7AU7J4iTOkW.jpg",
    },
    {
      id: 3,
      route: "Agra to Lucknow",
      time: "01:00 PM",
      price: "₹600",
      image:
        "https://as2.ftcdn.net/v2/jpg/04/85/66/09/1000_F_485660926_oZUh9mVD8QHwGoWw61VJD7AU7J4iTOkW.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 shadow-md">
        <div className="flex flex-row justify-between">
          <div>
          <h1 className="text-3xl font-bold">City Bus Service</h1>
          <nav className="space-x-4">
            <a href="#routes" className="hover:underline">
              Routes
            </a>
            <a href="#services" className="hover:underline">
              Services
            </a>
            <a href="#testimonials" className="hover:underline">
              Testimonials
            </a>
          </nav>
            <p className="text-sm mt-2">Fast, Affordable & Reliable Bus Service</p>

          </div>

        <div
          onClick={() => {
            // Clear localStorage or any auth tokens
            localStorage.clear();
            // Redirect to login page
            window.location.href = "/";
          }}
          className="px-4  bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white bg-opacity-90 p-10 text-center">
        <img
          src="https://as2.ftcdn.net/v2/jpg/04/85/66/09/1000_F_485660926_oZUh9mVD8QHwGoWw61VJD7AU7J4iTOkW.jpg"
          alt="Hero Bus"
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
        <h2 className="text-3xl font-semibold mb-4">
          Travel With Comfort & Safety
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          We provide modern buses, on-time service, and comfortable seating to
          make your journey enjoyable and safe.
        </p>
        <button className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl transition-all">
          Get Tickets
        </button>
      </section>

      {/* Available Routes Section */}
      <section id="routes" className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Available Routes
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {varOcg.map((bus) => (
            <div
              key={bus.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition"
            >
              <img
                src={bus.image}
                alt={bus.route}
                className="w-full h-40 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{bus.route}</h3>
                <p className="text-gray-700">Departure Time: {bus.time}</p>
                <p className="text-green-700 font-semibold">
                  Price: {bus.price}
                </p>
                <button className="mt-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-xl">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white bg-opacity-90 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Our Services
        </h2>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-xl shadow hover:shadow-xl transition">
            <img
              src="https://www.indiaspend.com/wp-content/uploads/buses.jpg"
              alt="Comfort"
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="font-bold text-lg">Comfortable Buses</h3>
            <p className="text-gray-700">
              All buses equipped with comfortable seats, AC, and Wi-Fi.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-xl shadow hover:shadow-xl transition">
            <img
              src="https://as2.ftcdn.net/v2/jpg/04/85/66/09/1000_F_485660926_oZUh9mVD8QHwGoWw61VJD7AU7J4iTOkW.jpg"
              alt="On Time"
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="font-bold text-lg">On-Time Service</h3>
            <p className="text-gray-700">
              Punctual departures and arrivals for a stress-free journey.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-xl shadow hover:shadow-xl transition">
            <img
              src="https://as2.ftcdn.net/v2/jpg/04/85/66/09/1000_F_485660926_oZUh9mVD8QHwGoWw61VJD7AU7J4iTOkW.jpg"
              alt="Support"
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="font-bold text-lg">24/7 Support</h3>
            <p className="text-gray-700">
              Our customer service team is available around the clock.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition">
            <img
              className="w-full h-32 object-contain rounded mb-2"
              src="data:image/jpeg;base64,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"
            />
            <p className="text-gray-700 italic">
              “The buses are always clean and comfortable. I love traveling with
              City Bus Service!”
            </p>
            <p className="text-right font-semibold mt-2">- Rajesh Kumar</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition">
            <img
              className="w-full h-32 object-contain rounded mb-2"
              src="data:image/jpeg;base64,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"
            />
            <p className="text-gray-700 italic">
              “Very punctual and affordable. Booking online is super easy.”
            </p>
            <p className="text-right font-semibold mt-2">- Priya Singh</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 mt-10 text-center">
        <p>© 2025 City Bus Service. All rights reserved.</p>
      </footer>

      <style>{`
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease infinite;
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Home;
