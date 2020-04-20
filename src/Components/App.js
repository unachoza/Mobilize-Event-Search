import React, { useState, useRef, useCallback } from 'react';
import Map from 'Components/Map/map.component';
import Form from 'Components/Form/form.component';
import EventList from 'Components/EventList/eventList.component';
import Header from 'Components/Header/header.component';
import { useEventsFetch } from 'API/MobilizeFetch';
import { EventsContext } from 'Context/Events/event.context';
import 'Components/App.css';
import LoadingSpinner from 'Components/loadingSpinner/loadingSpinner.component';

const App = () => {
  const [appendKey, setAppendKey] = useState(null);
  const [appendValue, setAppendValue] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, fetchedEvents, hasMore } = useEventsFetch(appendKey, appendValue, pageNumber);

  const observer = useRef();
  const lastEventElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
        }
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const upDateRequestUrl = (param, input) => {
    setAppendKey(param);
    setAppendValue(input);
    setPageNumber(0);
    console.log('param is this ', param, 'input skipped', input);
  };
  console.log('rerender')

  return (
    <div>
      <Header />
      <div className="body">
        {!loading ? (
          <EventsContext.Provider value={fetchedEvents}>
            <EventList events={fetchedEvents} loading={loading} lastEventElementRef={lastEventElementRef} />
            <div className="main-page">
              <Form upDateRequestUrl={upDateRequestUrl} />
              <Map />
            </div>
          </EventsContext.Provider>
        ) : (
          <LoadingSpinner loading={loading} />
        )}
        <div>{error && 'Error'}</div>
      </div>
    </div>
  );
};
export default App;

// ********** EDGE CASES*******
// 1. if one result map zoom don't work, so map won't render, same with eventList, need to make conditionals if fetchedEvents.lenght === 1
