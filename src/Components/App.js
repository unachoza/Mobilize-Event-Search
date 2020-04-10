import React, { useState } from 'react';
import Map from 'Components/Map/map.component';
import { ShelterMap } from 'Components/Map/mapwithMarker.component';
import Form from 'Components/Form/form.component';
import EventList from 'Components/EventList/eventList.component';
import Header from 'Components/Header/header.component';
import { useEventsFetch } from 'API/MobilizeFetch';
import { EventsContext } from 'Context/Events/event.context';
import 'Components/App.css';
import LoadingSpinner from 'Components/loadingSpinner/loadingSpinner.component';

const MOBILZE_BASE_URL = 'https://api.mobilize.us/v1/events?per_page=4';

const App = () => {
  let fetchedEvents = useEventsFetch(MOBILZE_BASE_URL, { fetchedEvents: null, loading: true });
  const [requestURL, setRequestURL] = useState(MOBILZE_BASE_URL);
  const [loading, setloading] = useState(false);
  console.log(fetchedEvents, loading);
  // {loading && <LoadingSpinner loading={loading} />}
  // return !fetchedEvents ? <LoadingSpinner loading={loading} /> :

  if (!fetchedEvents || fetchedEvents.loading) {
    return <LoadingSpinner loading={loading} />;
  } else if (fetchedEvents.fetchedEvents.data) {
    fetchedEvents = fetchedEvents.fetchedEvents.data.map((event) => {
      return {
        id: event.id,
        eventType: event.event_type,
        title: event.title,
        details: event.description,
        zipcode: event.location?.postal_code || null,
        coordinates: {
          lat: event.location?.location?.latitude || null,
          lng: event.location?.location?.longitude || null,
        },
        eventDate: {
          start: event.timeslots[0]?.start_date || null,
          end_date: event.timeslots[0]?.end_date || null,
        },
        url: event.browser_url || null,
        eventImg: event.featured_image_url || null,
        show: false,
      };
    });

    console.log(fetchedEvents);
    return (
      <div>
        <Header />
        <div className="body">
          <EventsContext.Provider value={fetchedEvents}>
            {/* {!fetchedEvents.props?.children ? ( */}
            <EventList events={fetchedEvents} loading={loading} />

            {/* <EventList events={fetchedEvents} loading={loading} /> */}
            <div className="main-page">
              {loading && <LoadingSpinner loading={loading} />}
              <Form />
              <ShelterMap fetchedEvents={fetchedEvents} />
              <Map visible={true} />
            </div>
          </EventsContext.Provider>
        </div>
      </div>
    );
  }
};

export default App;

// setfetchedEvents(useEventsFetch(requestURL))
// useEffect(() => {
//   setloading(true);
//   const getEvents = async () => {
//     const fetchedEvents = await eventsFetch(requestURL);
//     setFetchedEvents(useEventsFetch);
//     setloading(false);
//     console.log(fetchedEvents)

//   };
//   getEvents();
// }, [requestURL]);

// const upDateRequestUrl = (input, moreInputs = '') => {
//   setRequestURL(MOBILZE_BASE_URL + '&zipcode=' + input + moreInputs);
// };

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

// ******************
// return fetchedEvents;
//   } catch (error) {
//     const errorMessage = 'zipcode not valid';
//     setError(errorMessage);
//     console.log(error);
//     return <div style={{ color: 'red', fontSize: '50px' }}>{error}</div>;
//     // this.catchError()
//   }
// }
