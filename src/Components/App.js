import React, { useState, useEffect } from 'react';
import Map from 'Components/Map/map.component';
import Form from 'Components/Form/form.component';
import EventList from 'Components/EventList/eventList.component';
import Header from 'Components/Header/header.component';
import { useEventsFetch } from 'API/MobilizeFetch';
import { EventsContext } from 'Context/Events/event.context';
import 'Components/App.css';
import LoadingSpinner from 'Components/loadingSpinner/loadingSpinner.component';

const MOBILZE_BASE_URL = 'https://api.mobilize.us/v1/events?per_page=4';

const App = () => {
  const fetchedEvents = useEventsFetch(MOBILZE_BASE_URL, { fetchedEvents: null, loading: true });
  const [requestURL, setRequestURL] = useState(MOBILZE_BASE_URL);
  const [loading, setloading] = useState(false);
  console.log(fetchedEvents, loading);
  // {loading && <LoadingSpinner loading={loading} />}
  // return !fetchedEvents ? <LoadingSpinner loading={loading} /> :

  if (!fetchedEvents || fetchedEvents.loading) {
    return <LoadingSpinner loading={loading} />;
  } else if (fetchedEvents.fetchedEvents.data) {
    
    
    
    console.log(fetchedEvents.fetchedEvents.data)
    return (
      <div>
        <Header />
        <div className="body">
          <EventsContext.Provider value={fetchedEvents.fetchedEvents.data}>
            {/* {!fetchedEvents.props?.children ? ( */}
            <EventList events={fetchedEvents} loading={loading} />

            {/* <EventList events={fetchedEvents} loading={loading} /> */}
            <div className="main-page">
              {loading && <LoadingSpinner loading={loading} />}
              <Form />
              <Map />
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
