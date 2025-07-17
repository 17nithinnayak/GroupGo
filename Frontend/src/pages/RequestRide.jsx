// import React, { useState } from 'react';

// const RequestRide = () => {
//   const [formData, setFormData] = useState({
//     rider_id: '',
//     pickup: '',
//     destination: 'JSSSTU',
//     earliest_time: '',
//     latest_time: '',
//   });

//   const [step, setStep] = useState('form');
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFindRides = (e) => {
//     e.preventDefault();
//     setStep('confirm');
//   };

//   const handleConfirmRide = async () => {
//     setLoading(true);
//     setErrorMsg('');

//     try {
//       const response = await fetch('http://localhost:8000/api/request-ride', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setStep('done');
//       } else {
//         setErrorMsg(result.message || 'Something went wrong. Please try again.');
//       }
//     } catch (err) {
//       console.error('Error confirming ride:', err);
//       setErrorMsg('Server error. Please try again later.');
//     }

//     setLoading(false);
//   };

//   const resetForm = () => {
//     setFormData({
//       rider_id: '',
//       pickup: '',
//       destination: 'JSSSTU',
//       earliest_time: '',
//       latest_time: '',
//     });
//     setStep('form');
//     setErrorMsg('');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col px-7 py-5">
//       <div className="flex flex-col md:flex-row gap-6">
//         <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-6">
//           {step === 'form' && (
//             <form onSubmit={handleFindRides} className="space-y-6">
//               <h2 className="text-2xl font-bold text-indigo-700">Request Your Ride</h2>
//               <p className="text-gray-600 mb-4">Fill in your details to find a match.</p>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex flex-col">
//                   <label htmlFor="rider_id" className="text-sm font-semibold mb-1">Rider ID</label>
//                   <input type="text" id="rider_id" name="rider_id" className="p-3 border rounded-md" value={formData.rider_id} onChange={handleChange} required />
//                 </div>

//                 <div className="flex flex-col">
//                   <label htmlFor="pickup" className="text-sm font-semibold mb-1">Pickup Location</label>
//                   <input type="text" id="pickup" name="pickup" className="p-3 border rounded-md" value={formData.pickup} onChange={handleChange} required />
//                 </div>

//                 <div className="flex flex-col">
//                   <label htmlFor="destination" className="text-sm font-semibold mb-1">Destination</label>
//                   <input type="text" id="destination" name="destination" className="p-3 border rounded-md" value={formData.destination} onChange={handleChange} required />
//                 </div>

//                 <div className="flex flex-col">
//                   <label htmlFor="earliest_time" className="text-sm font-semibold mb-1">Earliest Departure Time</label>
//                   <input type="datetime-local" id="earliest_time" name="earliest_time" className="p-3 border rounded-md" value={formData.earliest_time} onChange={handleChange} required />
//                 </div>

//                 <div className="flex flex-col">
//                   <label htmlFor="latest_time" className="text-sm font-semibold mb-1">Latest Arrival Time</label>
//                   <input type="datetime-local" id="latest_time" name="latest_time" className="p-3 border rounded-md" value={formData.latest_time} onChange={handleChange} required />
//                 </div>
//               </div>

//               <button type="submit" className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-full shadow transition text-base">
//                 Find Rides
//               </button>
//             </form>
//           )}

//           {step === 'confirm' && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold text-indigo-700">Confirm Your Ride</h2>
//               <div className="bg-indigo-50 border border-indigo-100 rounded-md p-4 space-y-1 text-sm text-gray-800">
//                 <p><strong>Rider ID:</strong> {formData.rider_id}</p>
//                 <p><strong>Pickup:</strong> {formData.pickup}</p>
//                 <p><strong>Destination:</strong> {formData.destination}</p>
//                 <p><strong>Earliest Time:</strong> {formData.earliest_time}</p>
//                 <p><strong>Latest Time:</strong> {formData.latest_time}</p>
//               </div>

//               {errorMsg && <p className="text-red-600">{errorMsg}</p>}

//               <div className="flex gap-4">
//                 <button onClick={() => setStep('form')} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-gray-800">Go Back</button>
//                 <button onClick={handleConfirmRide} className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-full shadow text-base" disabled={loading}>
//                   {loading ? 'Confirming...' : 'Confirm Ride Request'}
//                 </button>
//               </div>
//             </div>
//           )}

//           {step === 'done' && (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold text-green-600">Ride Request Confirmed!</h2>
//               <p className="text-gray-700">We'll notify you when a matching driver is found.</p>
//               <button onClick={resetForm} className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-full shadow text-base">
//                 Make Another Request
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-4">
//           <h3 className="text-xl font-semibold text-indigo-700">Map Preview</h3>
//           <div className="bg-indigo-100 h-64 flex items-center justify-center rounded-md shadow-inner text-indigo-600 font-medium">
//             Map Preview
//           </div>
//           <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100">
//             <h4 className="font-semibold mb-2">Ride Summary:</h4>
//             <p className="text-gray-700">Rider ID: {formData.rider_id || 'Not set'}</p>
//             <p className="text-gray-700">Pickup: {formData.pickup || 'Not set'}</p>
//             <p className="text-gray-700">Destination: {formData.destination || 'Not set'}</p>
//             <p className="text-gray-700">Earliest Time: {formData.earliest_time || 'Not set'}</p>
//             <p className="text-gray-700">Latest Time: {formData.latest_time || 'Not set'}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestRide;
import React, { useState } from 'react';
import axios from 'axios';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      const response = await axios.post('http://localhost:8000/request_ride', formData);

      if (response.status === 200) {
        setStep('done');
      }
    } catch (error) {
      if (error.response?.data?.detail) {
        setErrorMsg(error.response.data.detail);
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
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
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-7 py-5">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-6">
          {step === 'form' && (
            <form onSubmit={handleFindRides} className="space-y-6">
              <h2 className="text-2xl font-bold text-indigo-700">Request Your Ride</h2>
              <p className="text-gray-600 mb-4">Fill in your details to find a match.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="rider_id" className="text-sm font-semibold mb-1">Rider ID</label>
                  <input type="text" id="rider_id" name="rider_id" className="p-3 border rounded-md" value={formData.rider_id} onChange={handleChange} required />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="pickup" className="text-sm font-semibold mb-1">Pickup Location</label>
                  <input type="text" id="pickup" name="pickup" className="p-3 border rounded-md" value={formData.pickup} onChange={handleChange} required />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="destination" className="text-sm font-semibold mb-1">Destination</label>
                  <input type="text" id="destination" name="destination" className="p-3 border rounded-md" value={formData.destination} onChange={handleChange} required />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="earliest_time" className="text-sm font-semibold mb-1">Earliest Departure Time</label>
                  <input type="datetime-local" id="earliest_time" name="earliest_time" className="p-3 border rounded-md" value={formData.earliest_time} onChange={handleChange} required />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="latest_time" className="text-sm font-semibold mb-1">Latest Arrival Time</label>
                  <input type="datetime-local" id="latest_time" name="latest_time" className="p-3 border rounded-md" value={formData.latest_time} onChange={handleChange} required />
                </div>
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
                <p><strong>Rider ID:</strong> {formData.rider_id}</p>
                <p><strong>Pickup:</strong> {formData.pickup}</p>
                <p><strong>Destination:</strong> {formData.destination}</p>
                <p><strong>Earliest Time:</strong> {formData.earliest_time}</p>
                <p><strong>Latest Time:</strong> {formData.latest_time}</p>
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
              <button onClick={resetForm} className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-full shadow text-base">
                Make Another Request
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <h3 className="text-xl font-semibold text-indigo-700">Map Preview</h3>
          <div className="bg-indigo-100 h-64 flex items-center justify-center rounded-md shadow-inner text-indigo-600 font-medium">
            Map Preview
          </div>
          <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100">
            <h4 className="font-semibold mb-2">Ride Summary:</h4>
            <p className="text-gray-700">Rider ID: {formData.rider_id || 'Not set'}</p>
            <p className="text-gray-700">Pickup: {formData.pickup || 'Not set'}</p>
            <p className="text-gray-700">Destination: {formData.destination || 'Not set'}</p>
            <p className="text-gray-700">Earliest Time: {formData.earliest_time || 'Not set'}</p>
            <p className="text-gray-700">Latest Time: {formData.latest_time || 'Not set'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestRide;

