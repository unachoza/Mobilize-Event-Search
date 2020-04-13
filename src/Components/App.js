import React, { useState, useRef, useCallback } from 'react';
import Map from 'Components/Map/map.component';
import Form from 'Components/Form/form.component';
import EventList from 'Components/EventList/eventList.component';
import Header from 'Components/Header/header.component';
import { eventsFetch, useEventsFetch } from 'API/MobilizeFetch';
import { EventsContext } from 'Context/Events/event.context';
import 'Components/App.css';
import LoadingSpinner from 'Components/loadingSpinner/loadingSpinner.component';
import { MOBILZE_BASE_URL } from 'Constants/constants';

const App = () => {
  const [paramsAndQuery, setParamsAndQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, fetchedEvents, hasMore } = useEventsFetch(paramsAndQuery, pageNumber);
  
  console.log(loading, error, fetchedEvents, hasMore)
  console.log('also looking for', paramsAndQuery)

  
  
  const observer = useRef()
  const lastEventElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const upDateRequestUrl = (input, moreInputs = '') => {
    console.log('update here', input, moreInputs);
    setParamsAndQuery(MOBILZE_BASE_URL + '&zipcode=' + input + moreInputs);
  };

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


// useEffect(() => {
  //   const getEvents = async () => {
  //     const fetchedEvents = await eventsFetch(requestURL); //useEventsFetch
  //   };
  //   getEvents();
  // }, [requestURL]);
  // console.log(requestURL, fetchedEvents, loading)