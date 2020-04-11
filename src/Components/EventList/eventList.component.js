import React, {useState} from 'react';
import Event from 'Components/Event/event.component';
import 'Components/EventList/eventList.styles.css';
import { useInfiniteScroll } from 'Hooks/infiniteScroll.hook';

const EventList = ({ events }) => {
  // const [eventCount, setEventCount] = useState(7)
  // const infiniteScroll = useInfiniteScroll();
  // setEventCount(infiniteScroll)
  
  // console.log('scrolling', eventCount)

  return (
    <div className="event-list-container">
      {!events.length > 0 ? (
        <div className="no-results">
          Oh dear!<br></br> Your search returned no events.
        </div>
      ) : (
        Object.entries(events)
         
          .map(({ id, ...otherEventProps }) => (
            <Event key={id} {...otherEventProps} />
          ))
      )}
    </div>
  );
};

export default EventList;
