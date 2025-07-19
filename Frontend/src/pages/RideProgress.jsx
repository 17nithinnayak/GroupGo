import React, { useState, useEffect } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup, Polyline, useMap
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import customMarker from '../assets/custom-marker.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl: customMarker,
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -30],
  shadowUrl: markerShadow,
  shadowSize: [45, 45],
});

const defaultCoords = [12.2958, 76.6394];

const FlyToPickup = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 13, { duration: 1.2 });
    }
  }, [coords]);
  return null;
};

const RideProgress = () => {
  const [driverData, setDriverData] = useState({});
  const [riderData, setRiderData] = useState({});
  const [driverCoords, setDriverCoords] = useState(defaultCoords);
  const [riderCoords, setRiderCoords] = useState(null);
  const [rideStarted, setRideStarted] = useState(false);
  const [rideCancelled, setRideCancelled] = useState(false);

  const geocodeLocation = async (place) => {
    const staticMap = {
      'Bogadi': [12.2958, 76.6101],
      'Saraswathipuram': [12.3015, 76.6311],
      'JSSSTU': [12.3034, 76.6490],
      'RTO Circle': [12.3090, 76.6456],
      'Ballal': [12.3151, 76.6431],
    };
    return staticMap[place] || defaultCoords;
  };

  useEffect(() => {
    const loadData = async () => {
      const driver = JSON.parse(localStorage.getItem('driverRideData'));
      const rider = JSON.parse(localStorage.getItem('matchedRider'));
      setDriverData(driver || {});
      setRiderData(rider || {});

      if (driver?.start) {
        const dCoords = await geocodeLocation(driver.start);
        setDriverCoords(dCoords);
      }

      if (rider?.pickup) {
        const rCoords = await geocodeLocation(rider.pickup);
        setRiderCoords(rCoords);
      }
    };
    loadData();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/drivers', driverData);
      alert('✅ Driver created successfully');
      console.log(response.data);
    } catch (err) {
      alert('❌ Error creating driver');
      console.error(err);
    }
  };

  const handleStartRide = () => {
    setRideStarted(true);
    setRideCancelled(false);
    alert('🚗 Ride Started!');
  };

  const handleCancelRide = () => {
    setRideCancelled(true);
    setRideStarted(false);
    alert('❌ Ride Canceled!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Driver Ride Status</h2>
      <main className="flex flex-col md:flex-row w-full gap-6">
        {/* Map Section */}
        <div className="flex-1 bg-white rounded-2xl shadow-md h-96 overflow-hidden">
          <MapContainer center={driverCoords} zoom={13} scrollWheelZoom={false} className="w-full h-full">
            <FlyToPickup coords={driverCoords} />
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {driverCoords && (
              <Marker position={driverCoords} icon={customIcon}>
                <Popup>🚗 Driver Start: {driverData.start}</Popup>
              </Marker>
            )}
            {riderCoords && (
              <Marker position={riderCoords} icon={customIcon}>
                <Popup>🧍 Rider Pickup: {riderData.pickup}</Popup>
              </Marker>
            )}
            {driverCoords && riderCoords && (
              <Polyline positions={[driverCoords, riderCoords]} color="blue" />
            )}
          </MapContainer>
        </div>

        {/* Ride Info Section */}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <h3 className="text-xl font-semibold text-indigo-700">Ride Summary</h3>

          <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100 space-y-2">
            <p className="text-gray-800 font-medium">👨‍✈️ Driver Info</p>
            {Object.entries(driverData).map(([key, val]) => (
              <p key={key} className="text-gray-700 capitalize">
                <strong>{key.replace('_', ' ')}:</strong> {val || 'Not set'}
              </p>
            ))}
          </div>

          <div className="bg-green-50 p-4 rounded-md border border-green-100 space-y-2">
            <p className="text-green-700 font-medium">🧍 Matched Rider Info</p>
            <p><strong>Rider ID:</strong> {riderData.rider_id || 'Not found'}</p>
            <p><strong>Pickup:</strong> {riderData.pickup}</p>
            <p><strong>Destination:</strong> {riderData.destination}</p>
            <p><strong>Path:</strong> {riderData.path?.join(' ➜ ') || 'Path unavailable'}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
            >
              Create Driver
            </button>
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

          <div className="pt-4">
            <strong
              className={`text-sm ${
                rideStarted ? 'text-green-600' : rideCancelled ? 'text-red-600' : 'text-yellow-600'
              }`}
            >
              Status: {rideStarted ? 'Started' : rideCancelled ? 'Cancelled' : 'Pending'}
            </strong>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RideProgress;

