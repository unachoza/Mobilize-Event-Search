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

export const useEventsFetch = (appendValue, appendKey, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [hasMore, setHasMore] = useState(false);
const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    setNextPage(null);
    console.log('reset ', nextPage)
  }, [appendValue, appendKey]);
  
  
  useEffect(() => {
    setFetchedEvents([]);
  }, [appendValue]);

  useEffect(() => {
    const fetchingFromAPI = async () => {
      setLoading(true);
      setError(false);
      console.log(appendKey, appendValue);

      let cancel;
      try {
        const params = new URLSearchParams({
          zipcode: DEFAULT_ZIPCODE,
        });
         let data = null;
        console.log(data, nextPage)
        appendKey === 'zipcode' && params.set(appendKey, appendValue);
        console.log('see i true', nextPage)
        nextPage
          ? (data = await axios.get(nextPage))
          : (data = await axios.get(MOBILZE_BASE_URL, {
              params: params,
              cancelToken: new axios.CancelToken((c) => (cancel = c)),
            }));
        console.log(data);
        setFetchedEvents((prevEvents) => {
          return [...new Set([...prevEvents, ...data.data.data.map((event) => normalizeEventData(event))])];
        });
        setHasMore(data.data.count > 0);
        
        setLoading(false);
      } catch (e) {
        if (axios.isCancel(e)) return;
        setError(true);
      }
      return () => cancel();
    };

    fetchingFromAPI();
  }, [appendKey, appendValue, pageNumber]);

  return { loading, error, fetchedEvents, hasMore };
};
