import React, { useState } from 'react';

const OfferRide = () => {
  const [formData, setFormData] = useState({
    source: 'JSSSTU Campus',
    destination: 'Mysuru City Center',
    date: '2025-07-04',
    time: '17:36',
    vehicleType: 'Sedan (e.g., Maruti Dzire)',
    capacity: '3 Passengers',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/offer-ride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Ride offered successfully!');
        // Optional: clear form or redirect
      } else {
        alert(`Error: ${result.message || 'Something went wrong'}`);
      }
    } catch (err) {
      alert('Failed to submit ride. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-4 ">
      <main className="flex flex-col md:flex-row p-4 gap-6 w-full">
        <form onSubmit={handleSubmit} className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">Offer a Ride</h2>
          <p className="text-gray-600 mb-4">
            Help fellow JSSSTU students by sharing your ride! Fill in the details below.
          </p>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-600">Ride Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="source"
                placeholder="Source Location"
                className="p-3 border rounded-md focus:ring focus:ring-indigo-300"
                value={formData.source}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="destination"
                placeholder="Destination Location"
                className="p-3 border rounded-md focus:ring focus:ring-indigo-300"
                value={formData.destination}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="date"
                className="p-3 border rounded-md focus:ring focus:ring-indigo-300"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <input
                type="time"
                name="time"
                className="p-3 border rounded-md focus:ring focus:ring-indigo-300"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-600">Vehicle & Capacity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                name="vehicleType"
                className="p-3 border rounded-md focus:ring focus:ring-indigo-300"
                value={formData.vehicleType}
                onChange={handleChange}
              >
                <option>Sedan (e.g., Maruti Dzire)</option>
                <option>SUV</option>
                <option>Hatchback</option>
              </select>
              <select
                name="capacity"
                className="p-3 border rounded-md focus:ring focus:ring-indigo-300"
                value={formData.capacity}
                onChange={handleChange}
              >
                <option>3 Passengers</option>
                <option>4 Passengers</option>
                <option>5 Passengers</option>
              </select>
              <textarea
                name="notes"
                placeholder="Additional Notes (Optional)"
                className="p-3 border rounded-md col-span-2 focus:ring focus:ring-indigo-300"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
          </section>

          <button
            type="submit"
            className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-full shadow transition text-base"
          >
            Create Ride
          </button>
        </form>

        {/* Right Section */}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <h3 className="text-xl font-semibold text-indigo-700">Route Preview on Map</h3>
          <div className="bg-indigo-100 h-64 flex items-center justify-center rounded-md shadow-inner text-indigo-600 font-medium">
            Map Preview
          </div>
          <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100">
            <h4 className="font-semibold mb-2">Map Key Points:</h4>
            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
              <li>Start: JSSSTU Campus</li>
              <li>End: Mysuru City Center</li>
              <li>Estimated Travel Time: 30 mins</li>
              <li>Approx. Distance: 10 km</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OfferRide;
