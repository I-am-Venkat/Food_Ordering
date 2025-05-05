import React from "react";
import { FaUtensils, FaTruck, FaRegClock } from "react-icons/fa";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className="bg-orange-50 min-h-screen font-sans text-gray-800">
      
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20 bg-gradient-to-r from-orange-100 to-yellow-50">
        <div className="max-w-xl mb-10 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-orange-600">
            Crave. Click. Eat.
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Get your favorite food delivered at lightning speed.
            Fresh, fast and finger-licking good!
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg shadow-md">
            Order Now
          </button>
        </div>

        <motion.img
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          src="https://images.unsplash.com/photo-1600891963935-c8586d0e5f87"
          alt="Delicious food"
          className="w-full max-w-md rounded-3xl shadow-xl"
        />
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 md:px-20 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <FaUtensils className="text-5xl text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Delicious Dishes</h3>
            <p className="text-gray-600">Curated by top chefs to satisfy your taste buds.</p>
          </div>
          <div>
            <FaTruck className="text-5xl text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Hot food at your doorstep in no time.</p>
          </div>
          <div>
            <FaRegClock className="text-5xl text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Service</h3>
            <p className="text-gray-600">Order anytime, anywhere, always.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-orange-100 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-700 mb-4">
          Ready to Satisfy Your Cravings?
        </h2>
        <p className="text-gray-700 mb-6">
          Browse through hundreds of delicious items and get them delivered now.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg shadow-lg">
          Explore Menu
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-white text-center py-6 text-sm text-gray-500 border-t">
        © 2025 CraveBite. All rights reserved.
      </footer>

    </div>
  );
};

export default Landing;
