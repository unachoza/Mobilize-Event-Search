import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import 'Components/Map/map.styles.css';
import EventsContext from 'Context/Events/event.context';
import {showEventDetails} from 'API/MobilizeFetch'

import { MOBILZE_BASE_URL } from 'Constants/constants';
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
// https://api.mobilize.us/v1/events?per_page=10&zipcode=11222
// https://api.mobilize.us/v1/events/82193


export const Map = () => (
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
        zoom={10.5}
        center={{
          lat: 40.7282702,
          lng: -73.9506774,
        }}
      >
        <EventsContext.Consumer>
          {(fetchedEvents) =>
            fetchedEvents.map((event) => (
              <Marker
                key={event.id}
                onClick={(e) => showEventDetails(event.id)}
                markers={event.title}
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

export default Map;
