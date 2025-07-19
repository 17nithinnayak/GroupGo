
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import customMarker from '../assets/custom-marker.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl: customMarker,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: markerShadow,
  shadowSize: [41, 41],
});

// const staticLocations = {
//   "mahalakshmi sweets": [12.286850822671129, 76.62451195610687],
//   "andolana circle": [12.287495035157423, 76.61728543935816],
//   "vaishnavi sweets": [12.295572605474634, 76.61734509343461],
//   "bislu maramma temple": [12.30240726206259, 76.61661553269082],
//   "aroma bakery": [12.307313010132926, 76.61580014112931],
//   "kavitha bakery": [12.295759547609048, 76.62116131412859],
//   "university main gate": [12.30747153199769, 76.62010194159087],
//   "kukralli": [12.306477976316588, 76.62655415560612],
//   "kamakshi hospital": [12.299865596226041, 76.62602815989834],
//   "fire brigade": [12.30096370301131, 76.63492284714587],
//   "kukralli main gate": [12.307236261197593, 76.63573501889807],
//   "sjce": [12.313184169467476, 76.61496418607852],
//   "chamundipuram": [12.287571415142676, 76.64974227646596],
//   "nanjungud road": [12.287216776445707, 76.65909302458824],
//   "nanjumalige circle": [12.293254319484596, 76.64847167210708],
//   "five lights circle": [12.291080503369336, 76.64641799124988],
//   "silk factory": [12.285801982689096, 76.64289654204065],
//   "ballal": [12.295213407375774, 76.64366328326356],
//   "iskcon": [12.285874477438377, 76.63375393606518],
//   "kuvemunagar": [12.286153726504937, 76.63077095624301],
// };
const staticLocations = {
  "bogadi": [12.303625, 76.567809],
  "kuvempunagar": [12.286153726504937, 76.63077095624301],
  "saraswathipuram": [12.297200, 76.620700],
  "iskcon": [12.285874477438377, 76.63375393606518],
  "vontikoppal": [12.313100, 76.635600],
  "jssstu": [12.311952, 76.614180],  // Near SJCE and Aroma
  "apolo": [12.295230, 76.644800],   // Apollo BGS Hospital region
  "ballal": [12.295213407375774, 76.64366328326356],
  "vijaya bank circle": [12.297000, 76.625200],
  "kamakshi hospital": [12.299865596226041, 76.62602815989834],
  "kukkralli": [12.306477976316588, 76.62655415560612],
  "mysuru university main gate": [12.30747153199769, 76.62010194159087],
  "aroma bakery": [12.307313010132926, 76.61580014112931],
  "sjce": [12.313184169467476, 76.61496418607852],
  "grandpa's kitchen": [12.317660, 76.617800],
  "vaishnavi sweets": [12.295572605474634, 76.61734509343461],
  "kavitha bakery": [12.295759547609048, 76.62116131412859],
  "rto circle": [12.296828, 76.637319],
  "ramaswamy": [12.296090, 76.640300],
  "mahalakshmi sweets": [12.286850822671129, 76.62451195610687],
  "andolana circle": [12.287495035157423, 76.61728543935816],
  "bislu maramma temple": [12.30240726206259, 76.61661553269082],
  "university main gate": [12.30747153199769, 76.62010194159087],
  "fire brigade": [12.30096370301131, 76.63492284714587],
  "kukralli main gate": [12.307236261197593, 76.63573501889807],
  "chamundipuram": [12.287571415142676, 76.64974227646596],
  "nanjungud road": [12.287216776445707, 76.65909302458824],
  "nanjumalige circle": [12.293254319484596, 76.64847167210708],
  "five lights circle": [12.291080503369336, 76.64641799124988],
  "silk factory": [12.285801982689096, 76.64289654204065]
};


function FlyToPickup({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 15);
  }, [coords]);
  return null;
}

const getLatLngFromAddress = (address) => {
  if (!address) return null;
  const key = address.trim().toLowerCase();
  return staticLocations[key] || null;
};

const MapComponent = ({ pickupAddress }) => {
  const pickupLatLng = getLatLngFromAddress(pickupAddress);

  return (
    <MapContainer center={[12.2958, 76.6394]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {pickupLatLng && (
        <Marker position={pickupLatLng} icon={customIcon}>
          <Popup>Your Pickup: {pickupAddress}</Popup>
        </Marker>
      )}
      <FlyToPickup coords={pickupLatLng} />
    </MapContainer>
  );
};

export default MapComponent;
