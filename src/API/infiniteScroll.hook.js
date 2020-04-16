import { useEffect, useState } from 'react';
import axios from 'axios';
import { MOBILZE_BASE_URL, DEFAULT_ZIPCODE } from 'Constants/constants';
// import { useEventsFetch } from 'API/MobilizeFetch';

export const useInfiniteScroll = (nextPage) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchingFromAPI = async () => {
      setLoading(true);
      setError(false);

      let cancel;
      try {
        const data = await axios.get(MOBILZE_BASE_URL, [{ cancelToken: new axios.CancelToken((c) => (cancel = c)) }]);

        setFetchedEvents((prevEvents) => {
          return [...new Set([...prevEvents, ...data])];
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
  }, []);
};
