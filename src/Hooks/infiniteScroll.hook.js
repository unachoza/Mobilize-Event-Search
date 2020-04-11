import { useState } from "react";

export const useInfiniteScroll = (start = 4, pace = 4) => {
  const [limit, setLimit] = useState(start);
  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setLimit(limit + pace);
    }
  };
  return limit;
};

// Instructions

// 1 - Call hook on a variable inside the component
// let inifiniteScroll = useInfiniteScroll()

// 2 - Use .splice() on disered array before mapping
// array.splice(0, infiniteScroll).map()