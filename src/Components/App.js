import React, { useState, useRef, useCallback } from 'react';
import Map from 'Components/Map/map.component';
import Form from 'Components/Form/form.component';
import EventList from 'Components/EventList/eventList.component';
import Header from 'Components/Header/header.component';
import { useEventsFetch } from 'API/MobilizeFetch';
import { EventsContext } from 'Context/event.context';
import 'Components/App.css';
import LoadingSpinner from 'Components/loadingSpinner/loadingSpinner.component';
import { MOBILZE_BASE_URL } from 'Constants/constants';

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [requestUrl, setRequestUrl] = useState(null);
  const { loading, error, fetchedEvents, hasMore } = useEventsFetch(pageNumber, requestUrl);

  //infinite scroll
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

  const oldUpdateRequestUrl = (input, moreInputs = '') => {
    setRequestUrl(MOBILZE_BASE_URL + '&zipcode=' + input + moreInputs);
    setPageNumber(1);
  };

  return (
    <div>
      <Header />
      <div className="body">
        {!loading ? (
          <EventsContext.Provider value={fetchedEvents}>
            <EventList events={fetchedEvents} loading={loading} lastEventElementRef={lastEventElementRef} />
            <div className="main-page">
              <Form oldUpdateRequestUrl={oldUpdateRequestUrl} />
              {error && <div>ZipCode Not Valid</div>}
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
