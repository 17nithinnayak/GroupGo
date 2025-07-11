// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/Login.jsx";  // note capitalization!
// import Homepage from "./pages/Homepage.jsx";
// import './index.css'
// import OfferRide from './pages/OfferRide.jsx';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//          <Route path="/Home" element={<Homepage />} />
//                   <Route path="/createRide" element={<OfferRide />} />

//         {/* Future routes can be added here, for example:
//         <Route path="/doctors-profile" element={<DoctorsPage />} />
//         */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Homepage";
import CreateRide from "./pages/OfferRide";
import RequestRide from "./pages/RequestRide";
import RideProgress from "./pages/RideProgress";
import LoginPage from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* routes with the persistent navbar */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/createRide" element={<CreateRide />} />
          <Route path="/requestRide" element={<RequestRide />} />
          <Route path="/rideProgress" element={<RideProgress />} />
        </Route>
        
        {/* route without navbar */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

