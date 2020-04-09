import React from 'react';
import Event from 'Components/Event/event.component';
import Pagination from 'Components/Pagination/pagination.component'



const EventList = ({ events }) => {
  console.log(events)
  return(
  <div className="event-list-container">
    <div className="event-list__title">List of Events from Mobilize API</div>
    {Object.values(events).map(({ id, ...otherEventProps }) => (
      <Event key={id} {...otherEventProps} />
    ))}
    <Pagination events={events}/>
  </div>
  );
}




export default EventList;

