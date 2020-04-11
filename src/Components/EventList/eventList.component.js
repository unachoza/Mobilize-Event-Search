import React from 'react';
import Event from 'Components/Event/event.component';
import Pagination from 'Components/Pagination/pagination.component';
import 'Components/EventList/eventList.styles.css';
import {useInfiniteScroll} from 'Hooks/infiniteScroll.hook'


const EventList = ({events}) =>  {
   let infiniteScroll = useInfiniteScroll()
    return (
      <div className="event-list-container">
        {!events.length > 0 ? (
          <div className="no-results">
            Oh dear!<br></br> Your search returned no events.
          </div>
        ) : (
          Object.values(events).slice(0, infiniteScroll)
            .map(({ id, ...otherEventProps }) => <Event key={id} {...otherEventProps} />)
        )}
        {events.length > 0 && <Pagination events={events} />}
      </div>
    );
  }

export default EventList;
  