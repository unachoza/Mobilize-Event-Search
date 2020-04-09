import React, { useState, useEffect } from 'react';
import Map from 'Components/Map/map.component';
import Form from 'Components/Form/form.component';
import EventList from 'Components/EventList/eventList.component';
import Header from 'Components/Header/header.component';
import eventsFetch from 'API/MobilizeFetch';
import 'Components/App.css';

const MOBILZE_BASE_URL = 'https://api.mobilize.us/v1/events?per_page=4';

const App = () => {
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [requestURL, setRequestURL] = useState(MOBILZE_BASE_URL);

  useEffect(() => {
    const getEvents = async () => {
      const fetchedEvents = await eventsFetch(requestURL);
      setFetchedEvents(fetchedEvents);
    };
    getEvents();
  }, [requestURL]);

  const upDateRequestUrl = (input, moreInputs = '') => {
    
    setRequestURL(MOBILZE_BASE_URL + '&zipcode=' + input + moreInputs);
  };
console.log(fetchedEvents)
  return (
    <div>
      <Header />
      <div className="body">
        <EventList events={fetchedEvents} />
        <div className="main-page">
          <Form upDateRequestUrl={upDateRequestUrl} />
          <Map />
        </div>
      </div>
    </div>
  );
};

export default App;
