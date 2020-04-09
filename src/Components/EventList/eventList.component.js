import React from 'react';
import Event from 'Components/Event/event.component';



const EventList = ({ events }) => {
  console.log(events)
  return(
  <div className="event-list">
    <div className="event-list__title">List of Events from Mobilize API</div>
    {Object.values(events).map(({ id, ...otherEventProps }) => (
      <Event key={id} {...otherEventProps} />
    ))}
  </div>
  );
}




export default EventList;

