import React, { useState, useEffect } from 'react';

export const useEventsFetch = (requestURL, defaultResponse) => {
  const [fetchedEvents, setFetchedEvents] = useState(defaultResponse);
  const getEvents = async (requestURL) => {
    const response = await fetch(`${requestURL}`);
    const data = await response.json();
    setFetchedEvents({fetchedEvents:data, loading:false});
  };
  useEffect(() => {
    getEvents(requestURL);
  }, []);
  return fetchedEvents
};

//   console.log(requestURL);
//   try {
//     const response = await fetch(`${requestURL}`);
//     const data = await response.json();
//     const fetchedEvents = await data.data.map((event) => {
//       return {
//         id: event.id,
//         eventType: event.event_type,
//         title: event.title,
//         details: event.description,
//         zipcode: event.location?.postal_code || null,
//         coordinates: {
//           lat: event.location?.location?.latitude || null,
//           lng: event.location?.location?.longitude || null,
//         },
//         eventDate: {
//           start: event.timeslots[0]?.start_date || null,
//           end_date: event.timeslots[0]?.end_date || null,
//         },
//         url: event.browser_url || null,
//         eventImg: event.featured_image_url || null,
//         show: false,
//       };
//     });
//     return fetchedEvents;
//   } catch (error) {
//     const errorMessage = 'zipcode not valid';
//     setError(errorMessage);
//     console.log(error);
//     return <div style={{ color: 'red', fontSize: '50px' }}>{error}</div>;
//     // this.catchError()
//   }
// }

// ****************************
//  const fetchedEvents = await data.data.map((event) => {
//       return {
//         id: event.id,
//         eventType: event.event_type,
//         title: event.title,
//         details: event.description,
//         zipcode: event.location?.postal_code || null,
//         coordinates: {
//           lat: event.location?.location?.latitude || null,
//           lng: event.location?.location?.longitude || null,
//         },
//         eventDate: {
//           start: event.timeslots[0]?.start_date || null,
//           end_date: event.timeslots[0]?.end_date || null,
//         },
//         url: event.browser_url || null,
//         eventImg: event.featured_image_url || null,
//         show: false,
//       };
//     });
