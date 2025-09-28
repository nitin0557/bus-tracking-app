import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home: React.FC = () => {
  const varOcg = [
    { id: 1, route: "Delhi to Jaipur", time: "07:00 AM", price: "₹500", image: "https://as2.ftcdn.net/v2/jpg/04/85/66/09/1000_F_485660926_oZUh9mVD8QHwGoWw61VJD7AU7J4iTOkW.jpg" },
    { id: 2, route: "Jaipur to Agra", time: "09:00 AM", price: "₹400", image: "https://as2.ftcdn.net/v2/jpg/04/85/66/09/1000_F_485660926_oZUh9mVD8QHwGoWw61VJD7AU7J4iTOkW.jpg" },
    { id: 3, route: "Agra to Lucknow", time: "01:00 PM", price: "₹600", image: "https://as2.ftcdn.net/v2/jpg/04/85/66/09/1000_F_485660926_oZUh9mVD8QHwGoWw61VJD7AU7J4iTOkW.jpg" },
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed:600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">City Bus Service</h1>
            <nav className="space-x-4">
              <a href="#routes" className="hover:underline">Routes</a>
              <a href="#services" className="hover:underline">Services</a>
              <a href="#testimonials" className="hover:underline">Testimonials</a>
            </nav>
            <p className="text-sm mt-2">Fast, Affordable & Reliable Bus Service</p>
          </div>
          <div
            onClick={() => { localStorage.clear(); window.location.href = "/"; }}
            className="p-2.5 bg-red-600 rounded hover:bg-red-700 cursor-pointer"
          >
            Logout
          </div>
        </div>
      </header>

      {/* Hero Section with Carousel */}
      <section className="bg-white bg-opacity-90 p-10 text-center">
        <Slider {...carouselSettings}>
          {varOcg.map((bus) => (
            <div key={bus.id} className="rounded-xl overflow-hidden">
              <img src={bus.image} alt={bus.route} className="w-full h-64 object-cover rounded-xl" />
              <div className="mt-4">
                <h2 className="text-3xl font-semibold">{bus.route}</h2>
                <p className="text-gray-700">Departure: {bus.time}</p>
                <p className="text-green-700 font-semibold">Price: {bus.price}</p>
                <button className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl transition-all">Book Now</button>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Available Routes */}
      <section id="routes" className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-white">Available Routes</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {varOcg.map(bus => (
            <div key={bus.id} className="bg-white rounded-2xl shadow hover:shadow-xl transition">
              <img src={bus.image} alt={bus.route} className="w-full h-40 object-cover rounded-t-2xl" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{bus.route}</h3>
                <p className="text-gray-700">Departure: {bus.time}</p>
                <p className="text-green-700 font-semibold">Price: {bus.price}</p>
                <button className="mt-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-xl">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-white bg-opacity-90 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-xl shadow hover:shadow-xl transition">
            <img src="https://www.indiaspend.com/wp-content/uploads/buses.jpg" alt="Comfort" className="w-full h-32 object-cover rounded mb-2" />
            <h3 className="font-bold text-lg">Comfortable Buses</h3>
            <p className="text-gray-700">All buses equipped with AC, Wi-Fi, and comfy seats.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-xl shadow hover:shadow-xl transition">
            <img src={varOcg[0].image} alt="On Time" className="w-full h-32 object-cover rounded mb-2" />
            <h3 className="font-bold text-lg">On-Time Service</h3>
            <p className="text-gray-700">Punctual departures and arrivals for a stress-free journey.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-xl shadow hover:shadow-xl transition">
            <img src={varOcg[0].image} alt="Support" className="w-full h-32 object-cover rounded mb-2" />
            <h3 className="font-bold text-lg">24/7 Support</h3>
            <p className="text-gray-700">Customer service available around the clock.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">What Our Customers Say</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition">
            <img src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="boy"/>
            <p className="text-gray-700 italic">“The buses are always clean and comfortable. I love traveling with City Bus Service!”</p>
            <p className="text-right font-semibold mt-2">- Rajesh Kumar</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition">
             <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="girl"/>
            <p className="text-gray-700 italic">“Booking tickets online was super easy and hassle-free. Highly recommended!”</p>
            <p className="text-right font-semibold mt-2">- Sita Sharma</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
