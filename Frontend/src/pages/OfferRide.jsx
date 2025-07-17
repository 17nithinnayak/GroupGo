// import React, { useState } from 'react';

// const OfferRide = () => {
//   const [formData, setFormData] = useState({
//     driver_id: '',
//     start: '',
//     destination: 'JSSSTU',
//     departure_time: '',
//     seats_available: 1
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === 'seats_available' ? parseInt(value) : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:8000/create_ride', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       const result = await response.json();

//       if (response.ok) {
//         alert('Ride offered successfully!');
//       } else {
//         alert(`Error: ${result.detail || 'Something went wrong'}`);
//       }
//     } catch (err) {
//       alert('Failed to submit ride. Please try again.');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col px-4">
//       <main className="flex flex-col md:flex-row p-4 gap-6 w-full">
//         <form onSubmit={handleSubmit} className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-6">
//           <h2 className="text-2xl font-bold text-indigo-700 mb-2">Offer a Ride</h2>
//           <p className="text-gray-600 mb-4">
//             Help fellow JSSSTU students by sharing your ride! Fill in the details below.
//           </p>

//           <section className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Driver ID</label>
//                 <input
//                   type="text"
//                   name="driver_id"
//                   placeholder="Your Unique Driver ID"
//                   className="p-3 border rounded-md w-full focus:ring focus:ring-indigo-300"
//                   value={formData.driver_id}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Start Location</label>
//                 <input
//                   type="text"
//                   name="start"
//                   placeholder="Start Location"
//                   className="p-3 border rounded-md w-full focus:ring focus:ring-indigo-300"
//                   value={formData.start}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
//                 <input
//                   type="text"
//                   name="destination"
//                   placeholder="Destination"
//                   className="p-3 border rounded-md w-full focus:ring focus:ring-indigo-300"
//                   value={formData.destination}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
//                 <input
//                   type="datetime-local"
//                   name="departure_time"
//                   className="p-3 border rounded-md w-full focus:ring focus:ring-indigo-300"
//                   value={formData.departure_time}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Seats Available</label>
//                 <select
//                   name="seats_available"
//                   className="p-3 border rounded-md w-full focus:ring focus:ring-indigo-300"
//                   value={formData.seats_available}
//                   onChange={handleChange}
//                 >
//                   <option value={1}>1 Seat</option>
//                   <option value={2}>2 Seats</option>
//                   <option value={3}>3 Seats</option>
//                   <option value={4}>4 Seats</option>
//                   <option value={5}>5 Seats</option>
//                 </select>
//               </div>

//             </div>
//           </section>

//           <button
//             type="submit"
//             className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-full shadow transition text-base"
//           >
//             Create Ride
//           </button>
//         </form>

//         <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-4">
//           <h3 className="text-xl font-semibold text-indigo-700">Route Preview</h3>
//           <div className="bg-indigo-100 h-64 flex items-center justify-center rounded-md shadow-inner text-indigo-600 font-medium">
//             Map Preview Placeholder
//           </div>
//           <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100">
//             <h4 className="font-semibold mb-2">Key Info:</h4>
//             <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
//               <li>Destination defaults to JSSSTU</li>
//               <li>Enter exact date and time</li>
//               <li>Provide valid unique Driver ID</li>
//             </ul>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default OfferRide;
import React, { useState } from 'react';
import axios from 'axios';

const OfferRide = () => {
  const [formData, setFormData] = useState({
    driver_id: '',
    start: '',
    destination: 'JSSSTU',
    departure_time: '',
    seats_available: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'seats_available' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/create_ride', formData);

      if (response.status === 200) {
        alert('Ride offered successfully!');
        setFormData({
          driver_id: '',
          start: '',
          destination: 'JSSSTU',
          departure_time: '',
          seats_available: 1
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        alert(`Error: ${error.response.data.detail}`);
      } else {
        alert('Failed to submit ride. Please try again.');
      }
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-4">
      <main className="flex flex-col md:flex-row p-4 gap-6 w-full">
        <form onSubmit={handleSubmit} className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">Offer a Ride</h2>
          <p className="text-gray-600 mb-4">
            Help fellow JSSSTU students by sharing your ride! Fill in the details below.
          </p>

          <section className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Driver ID</label>
                <input
                  type="text"
                  name="driver_id"
                  placeholder="Your Unique Driver ID"
                  className="p-3 border rounded-md w-full focus:ring focus:ring-indigo-300"
                  value={formData.driver_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Location</label>
                <input
                  type="text"
                  name="start"
                  placeholder="Start Location"
                  className="p-3 border rounded-md w-full focus:ring focus:ring-indigo-300"
                  value={formData.start}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <input
                  type="text"
                  name="destination"
                  placeholder="Destination"
                  className="p-3 border rounded-md w-full focus:ring focus:ring-indigo-300"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
                <input
                  type="datetime-local"
                  name="departure_time"
                  className="p-3 border rounded-md w-full focus:ring focus:ring-indigo-300"
                  value={formData.departure_time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seats Available</label>
                <select
                  name="seats_available"
                  className="p-3 border rounded-md w-full focus:ring focus:ring-indigo-300"
                  value={formData.seats_available}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5].map((seat) => (
                    <option key={seat} value={seat}>
                      {seat} {seat === 1 ? 'Seat' : 'Seats'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <button
            type="submit"
            className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-full shadow transition text-base"
          >
            Create Ride
          </button>
        </form>

        <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-4">
          <h3 className="text-xl font-semibold text-indigo-700">Route Preview</h3>
          <div className="bg-indigo-100 h-64 flex items-center justify-center rounded-md shadow-inner text-indigo-600 font-medium">
            Map Preview Placeholder
          </div>
          <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100">
            <h4 className="font-semibold mb-2">Key Info:</h4>
            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
              <li>Destination defaults to JSSSTU</li>
              <li>Enter exact date and time</li>
              <li>Provide valid unique Driver ID</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OfferRide;
