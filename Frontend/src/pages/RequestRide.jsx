import React, { useState } from 'react';

const RequestRide = () => {
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    date: '',
    timeRange: '',
    passengers: '1',
    luggage: false,
    petFriendly: false,
  });

  const [step, setStep] = useState('form'); // form | confirm | done
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFindRides = (e) => {
    e.preventDefault();
    setStep('confirm');
  };

  const handleConfirmRide = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:5000/api/request-ride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setStep('done');
      } else {
        setErrorMsg(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error confirming ride:', err);
      setErrorMsg('Server error. Please try again later.');
    }

    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      source: '',
      destination: '',
      date: '',
      timeRange: '',
      passengers: '1',
      luggage: false,
      petFriendly: false,
    });
    setStep('form');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-7 py-5">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-6">

          {step === 'form' && (
            <form onSubmit={handleFindRides} className="space-y-6">
              <h2 className="text-2xl font-bold text-indigo-700 mb-2">Request Your Ride</h2>
              <p className="text-gray-600 mb-4">Fill in the details to find a perfect match.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="source" placeholder="Source (e.g., Gate 1)" className="p-3 border rounded-md focus:ring-indigo-300" value={formData.source} onChange={handleChange} required />
                <input type="text" name="destination" placeholder="Destination (e.g., Bus Stand)" className="p-3 border rounded-md focus:ring-indigo-300" value={formData.destination} onChange={handleChange} required />
                <input type="date" name="date" className="p-3 border rounded-md focus:ring-indigo-300" value={formData.date} onChange={handleChange} required />
                <select name="timeRange" className="p-3 border rounded-md focus:ring-indigo-300" value={formData.timeRange} onChange={handleChange} required>
                  <option value="">Select time range</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
                <select name="passengers" className="p-3 border rounded-md focus:ring-indigo-300" value={formData.passengers} onChange={handleChange}>
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4 Passengers</option>
                </select>
              </div>

              <div className="flex items-center">
                <input type="checkbox" name="luggage" className="mr-2" checked={formData.luggage} onChange={handleChange} />
                <label className="text-gray-700">Allow luggage</label>
              </div>

              <div className="flex items-center">
                <input type="checkbox" name="petFriendly" className="mr-2" checked={formData.petFriendly} onChange={handleChange} />
                <label className="text-gray-700">Pet-friendly ride</label>
              </div>

              <button type="submit" className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-full shadow transition text-base">
                Find Rides
              </button>
            </form>
          )}

          {step === 'confirm' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-indigo-700 mb-2">Confirm Your Ride</h2>
              <p className="text-gray-700">Please review your request:</p>

              <div className="bg-indigo-50 border border-indigo-100 rounded-md p-4 space-y-1 text-gray-800 text-sm">
                <p><strong>From:</strong> {formData.source}</p>
                <p><strong>To:</strong> {formData.destination}</p>
                <p><strong>Date:</strong> {formData.date}</p>
                <p><strong>Time:</strong> {formData.timeRange}</p>
                <p><strong>Passengers:</strong> {formData.passengers}</p>
                <p><strong>Luggage:</strong> {formData.luggage ? 'Yes' : 'No'}</p>
                <p><strong>Pet Friendly:</strong> {formData.petFriendly ? 'Yes' : 'No'}</p>
              </div>

              {errorMsg && <p className="text-red-600">{errorMsg}</p>}

              <div className="flex gap-4">
                <button onClick={() => setStep('form')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md">Go Back</button>
                <button onClick={handleConfirmRide} className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-full shadow text-base" disabled={loading}>
                  {loading ? 'Confirming...' : 'Confirm Ride Request'}
                </button>
              </div>
            </div>
          )}

          {step === 'done' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-green-600 mb-2">Ride Request Confirmed!</h2>
              <p className="text-gray-700">Your request has been submitted successfully. We'll notify you when a matching ride is found.</p>

              <button onClick={resetForm} className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-full shadow text-base">
                Make Another Request
              </button>
            </div>
          )}
        </div>

        {/* Right Section - Map + Summary */}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <h3 className="text-xl font-semibold text-indigo-700">Map Preview</h3>
          <div className="bg-indigo-100 h-64 flex items-center justify-center rounded-md shadow-inner text-indigo-600 font-medium">
            Map Preview
          </div>
          <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100">
            <h4 className="font-semibold mb-2">Ride Summary:</h4>
            <p className="text-gray-700">Source: {formData.source || 'Not set'}</p>
            <p className="text-gray-700">Destination: {formData.destination || 'Not set'}</p>
            <p className="text-gray-700">Date: {formData.date || 'Not set'}</p>
            <p className="text-gray-700">Time: {formData.timeRange || 'Not set'}</p>
            <p className="text-gray-700">Passengers: {formData.passengers}</p>
            <p className="text-gray-700">Luggage: {formData.luggage ? 'Yes' : 'No'}</p>
            <p className="text-gray-700">Pet-friendly: {formData.petFriendly ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestRide;
