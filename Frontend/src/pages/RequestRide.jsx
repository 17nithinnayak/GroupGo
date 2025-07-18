import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MapComponent from '../components/MapView.jsx';

const RequestRide = () => {
  const [formData, setFormData] = useState({
    rider_id: '',
    pickup: '',
    destination: 'JSSSTU',
    earliest_time: '',
    latest_time: '',
  });

  const [step, setStep] = useState('form');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [matchedDrivers, setMatchedDrivers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFindRides = (e) => {
    e.preventDefault();
    setStep('confirm');
  };

  const handleConfirmRide = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await axios.post('http://localhost:8000/request_ride', formData);
      toast.success('Ride request submitted!');

      if (response.status === 200) {
        const matchResponse = await axios.post('http://localhost:8000/match');
        const matches = Array.isArray(matchResponse.data.matches) ? matchResponse.data.matches : [];
        setMatchedDrivers(matches);
        toast.success(matches.length > 0 ? 'Drivers matched!' : 'No drivers found.');
        setStep('done');
      } else {
        toast.warn('Ride saved, but matching failed.');
        setErrorMsg('Ride request saved, but matching failed.');
      }
    } catch (error) {
      const msg = error.response?.data?.detail || 'Something went wrong.';
      setErrorMsg(msg);
      toast.error(msg);
    }

    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      rider_id: '',
      pickup: '',
      destination: 'JSSSTU',
      earliest_time: '',
      latest_time: '',
    });
    setStep('form');
    setErrorMsg('');
    setMatchedDrivers([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-7 py-5">
      <ToastContainer position="top-center" />
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-6">
          {step === 'form' && (
            <form onSubmit={handleFindRides} className="space-y-6">
              <h2 className="text-2xl font-bold text-indigo-700">Request Your Ride</h2>
              <p className="text-gray-600 mb-4">Fill in your details to find a match.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['rider_id', 'pickup', 'destination', 'earliest_time', 'latest_time'].map((field) => (
                  <div key={field} className="flex flex-col">
                    <label htmlFor={field} className="text-sm font-semibold mb-1">
                      {field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </label>
                    <input
                      type={field.includes('time') ? 'datetime-local' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="p-3 border rounded-md"
                      required
                    />
                  </div>
                ))}
              </div>
              <button type="submit" className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-full shadow transition text-base">
                Find Rides
              </button>
            </form>
          )}

          {step === 'confirm' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-indigo-700">Confirm Your Ride</h2>
              <div className="bg-indigo-50 border border-indigo-100 rounded-md p-4 space-y-1 text-sm text-gray-800">
                {Object.entries(formData).map(([key, val]) => (
                  <p key={key}><strong>{key.replace('_', ' ')}:</strong> {val}</p>
                ))}
              </div>
              {errorMsg && <p className="text-red-600">{errorMsg}</p>}
              <div className="flex gap-4">
                <button onClick={() => setStep('form')} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-gray-800">Go Back</button>
                <button onClick={handleConfirmRide} className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-full shadow text-base" disabled={loading}>
                  {loading ? 'Confirming...' : 'Confirm Ride Request'}
                </button>
              </div>
            </div>
          )}

          {step === 'done' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-green-600">Ride Request Confirmed!</h2>
              <p className="text-gray-700">We'll notify you when a matching driver is found.</p>
              {matchedDrivers.length > 0 && (
                <div className="mt-4 space-y-3">
                  <h3 className="text-lg font-semibold text-indigo-700">Matched Drivers</h3>
                  <ul className="space-y-2">
                    {matchedDrivers.map((driver, idx) => (
                      <li key={idx} className="bg-white border rounded-md p-3 shadow-sm">
                        <p><strong>Name:</strong> {driver.name}</p>
                        <p><strong>Car:</strong> {driver.car_model}</p>
                        <p><strong>Contact:</strong> {driver.contact}</p>
                        <p><strong>Driver ID:</strong> {driver.driver_id}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button onClick={resetForm} className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-full shadow text-base">
                Make Another Request
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <h3 className="text-xl font-semibold text-indigo-700">Map Preview</h3>
          <MapComponent pickupAddress={formData.pickup} />
          <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100">
            <h4 className="font-semibold mb-2">Ride Summary:</h4>
            {Object.entries(formData).map(([key, val]) => (
              <p key={key} className="text-gray-700">
                {key.replace('_', ' ')}: {val || 'Not set'}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestRide;