import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import 'Components/Map/map.styles.css';
import { Marker } from '@react-google-maps/api';


const AiPIkey = process.env.GOOGLE_MAPS_API_KEY;

// const position =
// [{
//   lat: 42.33748,
//   lng: -74.77027
// },
//   {
//     lat: 42.23748,
//     lng: -74.77027
//   },
//   {
//     lat: 42.43748,
//     lng: -74.77027,
//   },
//   {
//     lat: 42.23748,
//     lng: -74.77027,
//   }]
// const position =
// {
//   lat: 42.33748,
//   lng: -74.77027
// }

const Map = ({ coordinates }) => {
  // console.log('this is location obj', coordinates);
  // console.log();

  return (
    <div className="map-container">
      <LoadScript id="script-loader" googleMapsApiKey={AiPIkey}>
        <GoogleMap
          id="circle-example"
          mapContainerStyle={{
            height: '60vh',
            width: '65vw',
            overflow: 'hidden',
            borderRadius: '20px',
            border: 'none',
            boxShadow: '0 1rem 2rem rgba(0,0,0,.8)',
          }}
          zoom={6.5}
          center={{
            lat: 42.23748,
            lng: -74.77027,
          }}
        >
          {/* <Marker position={coordinates} /> */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};



export default Map;
