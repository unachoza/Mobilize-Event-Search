import React, { useContext } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import 'Components/Map/map.styles.css';
import { Marker } from '@react-google-maps/api';
import EventsContext from 'Context/Events/event.context';


// const APIkey = process.env.GOOGLE_MAPS_API_KEY;

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Map = () => {
  // const { EventsContext } = useContext(EventsContext);
  return (
    <div className="map-container">
      <LoadScript id="script-loader" googleMapsApiKey={API_KEY}>
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
            {
              (fetchedEvents) => {
              const markerArray = fetchedEvents.map((event) => {
                return {
                  id: event.id,
                  lat: event.coordinates.lat,
                  lng: event.coordinates.lng,
                };
              });
              markerArray.map((marker) => {
                console.log({lat: marker.lat, lng: marker.lng})
                return marker.lat
                  ? <Marker key={marker.id} position={{ lat: marker.lat, lng: marker.lng }} visible={true} />
                  : console.log(' fuck');
              });
              }
            }
          </EventsContext.Consumer>
          {/* <Marker position={{ lat: 42.23748,
            lng: -74.77027
          }} />
          <Marker position={{ lat: 41.23740,
            lng: -74.77027
          }} />
           <Marker position={{ lat: 41.23740,
            lng: -73.77027
          }} /> */}
            {/* <Marker position={{ lat: 41.23740,
            lng: -73.70027}} /> */}
 
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;

{
  /* <Marker position={{ lat: 42.23748,
            lng: -74.77027}} /> */
}
