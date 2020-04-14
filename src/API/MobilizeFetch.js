import { useEffect, useState } from 'react';
import axios from 'axios';
import { MOBILZE_BASE_URL } from 'Constants/constants';

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

export const useEventsFetch = (zipCodeQuery, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setFetchedEvents([]);
  }, []);

  useEffect(() => {
    const fetchingFromAPI = async () => {
      setLoading(true);
      setError(false);

      let cancel;
      try {
        //   console.log(params, requestURL);
        //   const response = await fetch(`${requestURL}`);
        //   const data = await response.json();
        //   return data.data.map((event) => normalizeEventData(event));
        // };
        // let url = new URL(MOBILZE_BASE_URL)
        const params = new URLSearchParams({
        zipcode: 92130
        });
        let url = `${MOBILZE_BASE_URL},${params.toString()}`
        console.log('this is it', url)
        const data = await axios({
          method: "GET",
          url: MOBILZE_BASE_URL,
          params: params,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
        console.log("first", data)
        console.log(data.data.data[0]);

        // return data.data.map((event) => normalizeEventData(event));
        setFetchedEvents((prevEvents) => {
          return [...new Set([...prevEvents, ...data.data.data.map((event) => normalizeEventData(event))])];
        });
        setHasMore(data.count > 0);
        setLoading(false);
      } catch (e) {
        if (axios.isCancel(e)) return;
        setError(true);
      }
      return () => cancel();
    };

    fetchingFromAPI();
  }, []);

  return { loading, error, fetchedEvents, hasMore };
};
