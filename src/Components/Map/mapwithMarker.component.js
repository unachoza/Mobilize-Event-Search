import React, { useState } from "react"
import {useEventsFetch} from 'API/MobilizeFetch'
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

  return (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 29.5, lng: -95 }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker
            key={marker.id}
            onClick={onClick}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                  {marker.shelter}
                </div>
              </InfoWindow>}
            }
          </Marker>
        )
      })}
    </GoogleMap>
  )
})

export const ShelterMap = () => {
   let fetchedEvents = useEventsFetch(MOBILZE_BASE_URL, { fetchedEvents: null, loading: true });
  const [requestURL, setRequestURL] = useState(MOBILZE_BASE_URL);
  const [loading, setloading] = useState(false);
 console.log(fetchedEvents, loading);
 
 
 const [shelters, setShelters] = useState([null])
 const [selectedMarker, setSelectedMarker] = useState(false)
 
 const firstShelters = useEventsFetch("https://api.harveyneeds.org/api/v1/shelters?limit=20")
 console.log("these are the", firstShelters)
 setShelters(shelters.shelters)
 
  // componentDidMount() {
  //   fetch("https://api.harveyneeds.org/api/v1/shelters?limit=20")
  //     .then(r => r.json())
  //     .then(data => {
  //       this.setState({ shelters: data.shelters })
  //     })
  // }
  const handleClick = (marker, event) => {
    // console.log({ marker })
   setSelectedMarker(marker)
  }
    return (
      <MapWithAMarker
        selectedMarker={selectedMarker}
        markers={shelters}
        onClick={handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
}