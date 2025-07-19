
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OfferRide = () => {
  const [formData, setFormData] = useState({
    driver_id: '',
    start: '',
    destination: 'JSSSTU',
    departure_time: '',
    seats_available: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'seats_available' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/create_ride', formData);
     if (response.status === 200) {
  toast.success('🎉 Ride offered successfully!');
  localStorage.setItem('driverRideData', JSON.stringify(formData)); // <-- Add this

  setFormData({
    driver_id: '',
    start: '',
    destination: 'JSSSTU',
    departure_time: '',
    seats_available: 1,
  });
}

    } catch (error) {
      if (error.response?.data?.detail) {
        toast.error(`❌ Error: ${error.response.data.detail}`);
      } else {
        toast.error('Failed to submit ride. Please try again.');
      }
      console.error(error);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-indigo-100 to-white py-8 px-6 flex justify-center items-center">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="colored" />

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Ride Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
        >
          <h2 className="text-2xl font-bold text-indigo-700">Offer a Ride</h2>
          <p className="text-gray-600 text-sm">
            Help fellow students by sharing your ride. Fill out the details below.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-700">Driver ID</label>
              <input
                type="text"
                name="driver_id"
                value={formData.driver_id}
                onChange={handleChange}
                required
                className="w-full mt-1 px-2 py-2 border text-sm rounded focus:ring-2 focus:ring-indigo-400"
                placeholder="e.g., 12345"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700">Start Location</label>
              <input
                type="text"
                name="start"
                value={formData.start}
                onChange={handleChange}
                required
                className="w-full mt-1 px-2 py-2 border text-sm rounded focus:ring-2 focus:ring-indigo-400"
                placeholder="e.g., Kuvempunagar"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700">Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className="w-full mt-1 px-2 py-2 border text-sm rounded focus:ring-2 focus:ring-indigo-400"
                placeholder="e.g., JSSSTU"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700">Departure Time</label>
              <input
                type="datetime-local"
                name="departure_time"
                value={formData.departure_time}
                onChange={handleChange}
                required
                className="w-full mt-1 px-2 py-2 border text-sm rounded focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700">Seats Available</label>
              <select
                name="seats_available"
                value={formData.seats_available}
                onChange={handleChange}
                className="w-full mt-1 px-2 py-2 border text-sm rounded focus:ring-2 focus:ring-indigo-400"
              >
                {[1, 2, 3, 4, 5].map((seat) => (
                  <option key={seat} value={seat}>
                    {seat} {seat === 1 ? 'Seat' : 'Seats'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-fit px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium text-sm shadow-sm transition"
          >
            🚗 Offer Ride
          </button>
        </form>

        {/* Right: Info Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">Why Offer a Ride?</h3>
            <ul className="list-disc text-gray-700 space-y-1 pl-4 text-sm">
              <li>Help reduce traffic and pollution 🌍</li>
              <li>Support fellow students reaching JSSSTU 🎓</li>
              <li>Share fuel costs and save money 💸</li>
              <li>Build new connections and friendships 🤝</li>
            </ul>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-md p-4">
            <h4 className="text-sm font-medium text-indigo-600 mb-2">Quick Tips:</h4>
            <ul className="text-gray-700 text-sm space-y-1 list-disc pl-4">
              <li>Provide a valid driver ID.</li>
              <li>Set correct date & time for departure.</li>
              <li>Seats must be between 1–5.</li>
              <li>Destination defaults to JSSSTU.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferRide;

