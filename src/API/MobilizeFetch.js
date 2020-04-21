import { useEffect, useState } from 'react';
import axios from 'axios';
import { MOBILZE_BASE_URL, DEFAULT_ZIPCODE } from 'Constants/constants';

const normalizeEventData = (event) => ({
  id: event.id,
  showEventDetails: false,
  eventType: event.event_type,
  title: event.title,
  details: event.description,
  zipcode: event.location?.postal_code || null,
  coordinates: {
    lat: event.location?.location?.latitude || null,
    lng: event.location?.location?.longitude || null,
  },
  eventDate: {
    start: event.timeslots[event.timeslots.length - 1]?.start_date || null,
    end_date: event.timeslots[event.timeslots.length - 1]?.end_date || null,
  },
  url: event.browser_url || null,
  eventImg: event.featured_image_url || null,
});


export const useEventsFetch = ( pageNumber, requestUrl) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  useEffect((nextPage, fetchedEvents) => {
    console.log('works clear', requestUrl)
    setNextPage(null);
    setFetchedEvents([]);
    
  }, [requestUrl]);
  
  useEffect(() => {
    const fetchingFromAPI = async () => {
      console.log(requestUrl, pageNumber,  "in api")
      setLoading(true);
      setError(false);
      try {
        let data 
        // debugger
        if (pageNumber > 1) {
        data = await axios.get(nextPage)
        } else if (requestUrl) {
        data = await axios.get(requestUrl)
        } else {
        const params = new URLSearchParams({
          zipcode: DEFAULT_ZIPCODE,
        });
          //need to loop throgh arrays of appending keys and values
          
          // data = await axios.get(MOBILZE_BASE_URL, {})
        data = await axios.get(MOBILZE_BASE_URL, {
              params: params,
            })
        }
        setFetchedEvents((prevEvents) => {
          return [...new Set([...prevEvents, ...data.data.data.map((event) => normalizeEventData(event))])];
          
        });
        setHasMore(data.data.count > 0);
        setNextPage(data.data.next)
        setLoading(false);
      } catch (e) {
        setError(true);
      }
    };

    fetchingFromAPI();
  }, [ pageNumber, requestUrl]);

  return { loading, error, fetchedEvents, hasMore };
};

