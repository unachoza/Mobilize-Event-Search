import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import 'Components/Map/map.styles.css';
import EventsContext from 'Context/Events/event.context';
// import { useMapMarker } from 'Hooks/mapMarkers.hook';
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const EventMarker = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [highlightedEvent, setHighlightedEvent] = useState(null);

  useEffect(() => {
    console.log(selectedMarker);
    // setHighlightedEvent(!highlightedEvent);
    // console.log(highlightedEvent);
    return;
  }, [selectedMarker]);

  const divStyle = {
    background: `white`,
    padding: 1,
    color: 'blue',
    alignBottom: true,
    pane: 'mapPane',
  };

  return (
    <EventsContext.Consumer>
      {(fetchedEvents) => {
        return (
          <div>
            {fetchedEvents.map((event, i) => (
              <Marker
                key={event.id}
                onClick={() => setSelectedMarker(event)}
                markers={event.title}
                position={{
                  lat: event.coordinates.lat,
                  lng: event.coordinates.lng,
                }}
              />
            ))}
            {selectedMarker && (
              <InfoWindow
                position={{
                  lat: selectedMarker.coordinates.lat,
                  lng: selectedMarker.coordinates.lng,
                }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div style={divStyle}>
                  <p>{selectedMarker.title}</p>
                  <p>{selectedMarker.eventType}</p>
                </div>
              </InfoWindow>
            )}
          </div>
        );
      }}
    </EventsContext.Consumer>
  );
};

const Map = (props) => {
  console.log(props);
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
          zoom={7}
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

// let marker = new google.maps.Marker({

//         animation: google.maps.Animation.DROP,
//       });

//     function toggleBounce() {
//       if (marker.getAnimation() !== null) {
//         marker.setAnimation(null);
//       } else {
//         marker.setAnimation(google.maps.Animation.BOUNCE);
//       }
//     }
