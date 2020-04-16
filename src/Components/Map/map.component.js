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
    return;
  }, [selectedMarker]);

  const divStyle = {
    background: `white`,
    padding: 1,
    color: 'blue',
    alignBottom: true,
    pane: 'mapPane',
  };

  // const options = {
  // animation: animate.DROP
  // }
  return (
    <EventsContext.Consumer>
      {(fetchedEvents) => {
        console.log(fetchedEvents);
        return (
          <div>
            {(fetchedEvents.filter((event) => event.coordinates.lat)).map((event, i) => (
              <Marker
                key={event.id}
                //  animation ={document.getElementById('circle-example').animation.DROP}
                onClick={() => setSelectedMarker(event)} // setAnimation={animation.DROP}
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

const Map = () => {
  //   const options = {
  //     streetViewControl: false,
  //      Animation : DROP
  // }
  const locateMapCenter = (
    fetchedEvents,
    center = {
      lat: 40.7282702,
      lng: -73.9506774,
    }
  ) => {
    if (fetchedEvents) {
      center = fetchedEvents.find((event) => event.coordinates.lat);
    }
    return center.coordinates;
  };
  return (
    <div className="map-container">
      <LoadScript id="script-loader" googleMapsApiKey={API_KEY}>
        <EventsContext.Consumer>
          {(fetchedEvents) => (
            <GoogleMap
              id="circle-example"
              mapContainerStyle={{
                height: '60vh',
                width: '60vw',
                overflow: 'hidden',
                borderRadius: '20px',
                border: 'solid #0d0a92 2px',
                boxShadow: '0 1rem 2rem rgba(0,0,0,.8)',
              }}
              zoom={12}
              center={locateMapCenter(fetchedEvents)}
              // animation={DROP}
            >
              <EventMarker />
            </GoogleMap>
          )}
        </EventsContext.Consumer>
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
