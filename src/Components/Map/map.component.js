import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import 'Components/Map/map.styles.css';
import EventsContext from 'Context/Events/event.context';
import { showEventDetails } from 'API/MobilizeFetch';
import { useMapMarker } from 'Hooks/mapMarkers.hook';
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
// https://api.mobilize.us/v1/events?per_page=10&zipcode=11222
// https://api.mobilize.us/v1/events/82193

const EventMarker = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  useEffect(() => {
    const showMarkerInfoBox = (event) => {
      showEventDetails(event.id);
      console.log('i was clickedc', event);
      return event;
    };
  }, [selectedMarker]);

  return (
    <EventsContext.Consumer>
      {(fetchedEvents) =>
        fetchedEvents.map((event, i) => {
          return (
            <div key={i}>
              <Marker
                key={event.id}
                // onClick={() => setSelectedMarker(event)}
                // onClick={(e) => showEventDetails(event.id)}
                onClick={() => console.log(setSelectedMarker(event.id))}
                markers={event.title}
                position={{
                  lat: event.coordinates.lat,
                  lng: event.coordinates.lng,
                }}
              />
              {selectedMarker && (
                <InfoWindow
                  position={{
                    lat: event.coordinates.lat,
                    lng: event.coordinates.lng,
                  }}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div>
                    <h2>{event.title}</h2>
                  </div>
                </InfoWindow>
              )}
            </div>
          );
        })
      }
    </EventsContext.Consumer>
  );
};

const Map = () => {
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
          zoom={10.5}
          center={{
            lat: 40.7282702,
            lng: -73.9506774,
          }}
        >
          <EventMarker />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;

{
  /* <EventsContext.Consumer>
            {(fetchedEvents) =>
              fetchedEvents.map((event, i) => {
                return (
                  <div key={i}>
                    <Marker
                      key={event.id}
                      onClick={() => setSelectedMarker(event)}
                      // onClick={(e) => showEventDetails(event.id)}
                      markers={event.title}
                      position={{
                        lat: event.coordinates.lat,
                        lng: event.coordinates.lng,
                      }}
                    />
                    {selectedMarker && (
                      <InfoWindow
                        position={{
                          lat: event.coordinates.lat,
                          lng: event.coordinates.lng,
                        }}
                        onCloseClick={() => setSelectedMarker(null)}
                      ></InfoWindow>
                    )}
                  </div>
                );
              })
            }
          </EventsContext.Consumer> */
}
