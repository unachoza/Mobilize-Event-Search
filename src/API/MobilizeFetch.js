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

  useEffect((nextPage, fetchedEvents) => {
    setNextPage(null);
    setFetchedEvents([]);
  }, [appendValue, appendKey]);
console.log(appendValue, appendKey);
  useEffect(() => {
    const fetchingFromAPI = async () => {
      setLoading(true);
      setError(false);
      const mobilizeUrl = new URL(MOBILZE_BASE_URL)
      console.log(appendKey, appendValue);
      try {
        let data 
        if (pageNumber > 1) {
        data = await axios.get(nextPage)
        } else {
        const params = new URLSearchParams({
          zipcode: DEFAULT_ZIPCODE,
        });
          //need to loop throgh arrays of appending keys and values
          
          appendKey === 'zipcode' && params.set(appendKey, appendValue);
          const mobilizeUrl = new URL(MOBILZE_BASE_URL)
          data = await axios.get(MOBILZE_BASE_URL, {})
        data = await axios.get(MOBILZE_BASE_URL, {
              params: params,
            })
        }
          
        console.log(data.config);
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
  }, [appendKey, appendValue, pageNumber]);

  return { loading, error, fetchedEvents, hasMore };
};

