import React, { useContext } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import 'Components/Map/map.styles.css';
import { Marker } from '@react-google-maps/api';
import EventsContext from 'Context/Events/event.context';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Map = () => {
  // const fetchedEvents = useContext(EventsContext);
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
            {(fetchedEvents) =>
              fetchedEvents.map((event) => (
                <Marker
                  key={event.id}
                  position={{
                    lat: event.coordinates.lat,
                    lng: event.coordinates.lng,
                  }}
                />
              ))
            }
          </EventsContext.Consumer>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
