import React, { useState, useEffect } from 'react';
import Map from 'Components/Map/map.component';
import Form from 'Components/Form/form.component';
import EventList from 'Components/EventList/eventList.component';
import Header from 'Components/Header/header.component';
import eventsFetch from 'API/MobilizeFetch';
import { EventsContext } from 'Context/Events/event.context';
import 'Components/App.css';
import LoadingSpinner from 'Components/loadingSpinner/loadingSpinner.component';

const MOBILZE_BASE_URL = 'https://api.mobilize.us/v1/events?per_page=4';

const App = () => {
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [requestURL, setRequestURL] = useState(MOBILZE_BASE_URL);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    const getEvents = async () => {
      const fetchedEvents = await eventsFetch(requestURL);
      setFetchedEvents(fetchedEvents);
      setloading(false);
    };
    getEvents();
  }, [requestURL]);
  
  const upDateRequestUrl = (input, moreInputs = '') => {
    console.log("update here", input, moreInputs)
    setRequestURL(MOBILZE_BASE_URL + '&zipcode=' + input + moreInputs);
  };
  console.log(fetchedEvents);
  
  console.log('this is the loading status', loading);
  return (
    <div>
      <Header />
      <div className="body">
        {!loading ? (
          <EventsContext.Provider value={fetchedEvents}>
            <EventList events={fetchedEvents} loading={loading} />
            <div className="main-page">
              <Form upDateRequestUrl={upDateRequestUrl} />
              <Map />
            </div>
          </EventsContext.Provider>
        ) : (
          <LoadingSpinner loading={loading} />
        )}
      </div>
    </div>
  );
};
export default App;
