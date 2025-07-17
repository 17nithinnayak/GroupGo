import React, { useState } from 'react';

const RideProgress = () => {
  const [rideDetails] = useState({
    driver: 'Karthik S.',
    college: 'JSSSTU Student',
    riders: 3,
    vehicle: 'Maruti Suzuki Swift (KA-09-AB-1234)',
    eta: '15 mins',
    distance: '4.5 km',
    status: 'Pending'
  });

  const handleStartRide = () => {
    alert('Ride Started!');
    // Implement ride start logic
  };

  const handleCancelRide = () => {
    alert('Ride Canceled!');
    // Implement ride cancel logic
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Live Ride Progress</h2>
      <main className="flex flex-col md:flex-row w-full gap-6">
        
        {/* Map Section */}
        {/* Map Section */}
<div className="flex-1 bg-white rounded-2xl shadow-md h-96 overflow-hidden">
  <iframe
    src="https://snazzymaps.com/embed/724814"
    width="100%"
    height="100%"
    style={{ border: "none" }}
    title="Snazzy Map Preview"
  />
</div>


        {/* Ride Summary Section */}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <h3 className="text-xl font-semibold text-indigo-700">Ride Summary</h3>
          <p><strong>Driver:</strong> {rideDetails.driver}</p>
          <p><strong>College:</strong> {rideDetails.college}</p>
          <p><strong>Riders:</strong> {rideDetails.riders}</p>
          <p><strong>Vehicle:</strong> {rideDetails.vehicle}</p>
          <p><strong>ETA:</strong> {rideDetails.eta}</p>
          <p><strong>Distance:</strong> {rideDetails.distance}</p>
          
          <div className="mt-4">
            <strong className="text-yellow-600">Status: {rideDetails.status}</strong>
            <div className="mt-2 flex space-x-4">
              <button
                onClick={handleStartRide}
                className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded shadow"
              >
                Start Ride
              </button>
              <button
                onClick={handleCancelRide}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
              >
                Cancel Ride
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RideProgress;
