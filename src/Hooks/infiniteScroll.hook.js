import { useState } from 'react';

export const useInfiniteScroll = (start = 7, pace = 10) => {
  const [limit, setLimit] = useState(start);
console.log(start, pace)
  const handleScroll = () => {
    window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
      ? setLimit(limit + pace)
     : console.log(
      "good", limit);
   return limit
  };

  window.addEventListener('scroll', handleScroll);
};
