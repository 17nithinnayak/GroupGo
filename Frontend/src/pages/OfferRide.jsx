
// import React from 'react';

// const CreateRide = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* Header */}
     

//       {/* Main Content */}
//       <main className="flex flex-col md:flex-row p-8">
//         {/* Left Section */}
//         <div className="flex-1 bg-white rounded-lg shadow-md p-6 mr-0 md:mr-4">
//           <h2 className="text-lg font-semibold mb-4">Offer a Ride</h2>
//           <p className="text-gray-500 mb-6">Help fellow JSSSTU students by sharing your ride! Fill in the details below.</p>

//           <section className="mb-6">
//             <h3 className="font-medium mb-2">Ride Details</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder="Source Location"
//                 className="p-2 border rounded"
//                 defaultValue="JSSSTU Campus"
//               />
//               <input
//                 type="text"
//                 placeholder="Destination Location"
//                 className="p-2 border rounded"
//                 defaultValue="Mysuru City Center"
//               />
//               <input
//                 type="date"
//                 className="p-2 border rounded"
//                 defaultValue="2025-07-04"
//               />
//               <input
//                 type="time"
//                 className="p-2 border rounded"
//                 defaultValue="17:36"
//               />
//             </div>
//           </section>

//           <section className="mb-6">
//             <h3 className="font-medium mb-2">Vehicle & Capacity</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <select className="p-2 border rounded">
//                 <option>Sedan (e.g., Maruti Dzire)</option>
//                 <option>SUV</option>
//                 <option>Hatchback</option>
//               </select>
//               <select className="p-2 border rounded">
//                 <option>3 Passengers</option>
//                 <option>4 Passengers</option>
//                 <option>5 Passengers</option>
//               </select>
//               <textarea
//                 placeholder="Additional Notes (Optional)"
//                 className="p-2 border rounded col-span-2"
//                 rows="3"
//               />
//             </div>
//           </section>

//           <button className="bg-blue-600 text-white px-4 py-2 rounded">Create Ride</button>
//         </div>

//         {/* Right Section */}
//         <div className="flex-1 bg-white rounded-lg shadow-md p-6 mt-4 md:mt-0">
//           <h3 className="font-medium mb-2">Route Preview on Map</h3>
//           <div className="bg-gray-200 h-48 mb-4 flex justify-center items-center">
//             {/* Placeholder for Map */}
//             <p>Map goes here - visualize your selected source and destination.</p>
//           </div>
//           <div className="bg-pink-100 p-4 rounded">
//             <h4 className="font-medium">Map Key Points:</h4>
//             <ul className="list-disc pl-5">
//               <li>Start: JSSSTU Campus</li>
//               <li>End: Mysuru City Center</li>
//               <li>Estimated Travel Time: 30 mins</li>
//               <li>Approx. Distance: 10 km</li>
//             </ul>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="text-center p-4 bg-gray-800 text-white mt-auto">
//         Made with ❤️ by Ysisly
//       </footer>
//     </div>
//   );
// };

// export default CreateRide;
import React from 'react';

const OfferRide = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
     

      {/* Main Content */}
      <main className="flex flex-col md:flex-row p-8 gap-6 max-w-7xl mx-auto">
        {/* Left Section */}
        <div className="flex-1 bg-white rounded-2xl shadow p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-indigo-700 mb-2">Offer a Ride</h2>
            <p className="text-gray-600 mb-4">
              Help fellow JSSSTU students by sharing your ride! Fill in the details below.
            </p>
          </div>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-600">Ride Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Source Location"
                className="p-3 border rounded-md focus:ring focus:ring-indigo-300"
                defaultValue="JSSSTU Campus"
              />
              <input
                type="text"
                placeholder="Destination Location"
                className="p-3 border rounded-md focus:ring focus:ring-indigo-300"
                defaultValue="Mysuru City Center"
              />
              <input
                type="date"
                className="p-3 border rounded-md focus:ring focus:ring-indigo-300"
                defaultValue="2025-07-04"
              />
              <input
                type="time"
                className="p-3 border rounded-md focus:ring focus:ring-indigo-300"
                defaultValue="17:36"
              />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-600">Vehicle & Capacity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select className="p-3 border rounded-md focus:ring focus:ring-indigo-300">
                <option>Sedan (e.g., Maruti Dzire)</option>
                <option>SUV</option>
                <option>Hatchback</option>
              </select>
              <select className="p-3 border rounded-md focus:ring focus:ring-indigo-300">
                <option>3 Passengers</option>
                <option>4 Passengers</option>
                <option>5 Passengers</option>
              </select>
              <textarea
                placeholder="Additional Notes (Optional)"
                className="p-3 border rounded-md col-span-2 focus:ring focus:ring-indigo-300"
                rows="3"
              />
            </div>
          </section>

          <button className="w-full bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-3 rounded-full shadow transition text-lg">
            Create Ride
          </button>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-white rounded-2xl shadow p-6 space-y-4">
          <h3 className="text-xl font-semibold text-indigo-700">Route Preview</h3>
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
