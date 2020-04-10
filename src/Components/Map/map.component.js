import React, { useContext } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import 'Components/Map/map.styles.css';
import { Marker } from '@react-google-maps/api';
import EventsContext from 'Context/Events/event.context';

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
  const fetchedEvents = useContext(EventsContext)
  console.log("is context working" , fetchedEvents)
  return (
    <div className="map-container">
      <LoadScript id="script-loader" googleMapsApiKey={AiPIkey}>
        <GoogleMap
          id="circle-example"
          mapContainerStyle={{
            height: '60vh',
            width: '60vw',
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
          <EventsContext.Consumer>
            {fetchedEvents => {
              const markerArray = fetchedEvents.map(event => {
                return {
                  coordinates: event.coordinates
                }
              });
              console.log("checkout this marker array", markerArray)
              return <Marker position={markerArray} />
            }
            }
          </EventsContext.Consumer>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
