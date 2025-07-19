
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MapComponent from '../components/MapView';

const RequestRide = () => {
  const [formData, setFormData] = useState({
    rider_id: '',
    pickup: '',
    destination: '',
    earliest_time: '',
    latest_time: '',
  });

  const [step, setStep] = useState('form');
  const [loading, setLoading] = useState(false);
  const [matchedDrivers, setMatchedDrivers] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [rideConfirmed, setRideConfirmed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Updated to send only "YYYY-MM-DDTHH:MM"
  const convertToISOString = (localDateTime) => {
    try {
      const date = new Date(localDateTime);
      const pad = (n) => (n < 10 ? '0' + n : n);
      return (
        date.getFullYear() +
        '-' +
        pad(date.getMonth() + 1) +
        '-' +
        pad(date.getDate()) +
        'T' +
        pad(date.getHours()) +
        ':' +
        pad(date.getMinutes())
      );
    } catch {
      return localDateTime;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setStep('confirm');
  };

  const handleConfirmRide = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      await axios.post('http://localhost:8000/request_ride', {
        ...formData,
        earliest_time: convertToISOString(formData.earliest_time),
        latest_time: convertToISOString(formData.latest_time),
      });
      toast.success('Ride request submitted!');
      setRideConfirmed(true);
    } catch (err) {
      if (err.response?.status === 400 && err.response.data?.detail === 'Rider ID already exists.') {
        toast.info('Rider already exists. You may still find matches.');
        setRideConfirmed(true);
      } else {
        setErrorMsg(err.response?.data?.detail || 'Failed to request ride.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMatchDrivers = async () => {
  setLoading(true);
  setErrorMsg('');
  try {
    const matchRes = await axios.post('http://localhost:8000/match');

    // ✅ Use the correct key "matched" here
    setMatchedDrivers(matchRes.data.matched || []);
localStorage.setItem('riderData', JSON.stringify(formData));

    toast.success('Matching complete!');
    setStep('done');
  } catch (err) {
    console.error(err);
    setErrorMsg('Matching failed.');
  } finally {
    setLoading(false);
  }
};


  const resetForm = () => {
    setFormData({
      rider_id: '',
      pickup: '',
      destination: '',
      earliest_time: '',
      latest_time: '',
    });
    setStep('form');
    setMatchedDrivers([]);
    setErrorMsg('');
    setRideConfirmed(false);
  };

  return (
    <div className="bg-gray-50 px-4 py-6 min-h-[85vh] overflow-hidden">
      <ToastContainer position="top-center" />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 h-full">
        {/* Left Panel */}
        <div className="flex-1 bg-white rounded-xl shadow p-4 overflow-auto">
          {step === 'form' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold text-indigo-700">Request a Ride</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['rider_id', 'pickup', 'destination', 'earliest_time', 'latest_time'].map((field) => (
                  <div key={field} className="flex flex-col text-sm">
                    <label htmlFor={field} className="mb-1 font-medium text-gray-700">
                      {field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </label>
                    <input
                      type={field.includes('time') ? 'datetime-local' : 'text'}
                      name={field}
                      id={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="p-2 border rounded-md text-sm"
                      required
                    />
                  </div>
                ))}
              </div>
              <button type="submit" className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm">
                Request Ride
              </button>
            </form>
          )}

          {step === 'confirm' && (
            <div className="space-y-3 text-sm">
              <h2 className="text-xl font-semibold text-indigo-700">Confirm Your Ride</h2>
              <div className="bg-indigo-50 border rounded-md p-3 space-y-1">
                {Object.entries(formData).map(([key, val]) => (
                  <p key={key}><strong>{key.replace('_', ' ')}:</strong> {val}</p>
                ))}
              </div>
              {errorMsg && <p className="text-red-600">{errorMsg}</p>}
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setStep('form')} className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-sm">
                  Go Back
                </button>
                <button
                  onClick={handleConfirmRide}
                  disabled={loading || rideConfirmed}
                  className={`px-4 py-2 rounded-md text-sm text-white ${rideConfirmed ? 'bg-green-500' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                  {loading ? 'Submitting...' : rideConfirmed ? 'Ride Confirmed' : 'Confirm Ride'}
                </button>
                <button
                  onClick={handleMatchDrivers}
                  disabled={!rideConfirmed || loading}
                  className={`px-4 py-2 rounded-md text-sm text-white ${rideConfirmed ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}
                >
                  {loading ? 'Matching...' : 'Find Matches'}
                </button>
              </div>
            </div>
          )}

          {step === 'done' && (
            <div className="space-y-3 text-sm">
              <h2 className="text-xl font-semibold text-green-600">Request Complete!</h2>
              {matchedDrivers.length > 0 ? (
                <ul className="space-y-3">
                  {matchedDrivers.map((driver, i) => (
                    <li key={i} className="border rounded-md p-3 shadow-sm">
                      <p><strong>Match Type:</strong> {driver.match_type}</p>
                      <p><strong>Driver ID:</strong> {driver.driver_id}</p>
                      <p><strong>Driver Path:</strong> {driver.driver_path?.join(' ➔ ')}</p>
                      <p><strong>Rider Path:</strong> {driver.rider_path?.join(' ➔ ')}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No drivers matched. Try again later.</p>
              )}
              <button onClick={resetForm} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm">
                New Request
              </button>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-white rounded-xl shadow p-4 space-y-3 overflow-auto">
          <h3 className="text-lg font-semibold text-indigo-700">Map Preview</h3>
          <MapComponent pickupAddress={formData.pickup} />
          <div className="bg-indigo-50 p-3 rounded-md border text-sm">
            <h4 className="font-semibold mb-1">Ride Summary</h4>
            {Object.entries(formData).map(([key, val]) => (
              <p key={key}>{key.replace('_', ' ')}: {val || 'Not set'}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestRide;
