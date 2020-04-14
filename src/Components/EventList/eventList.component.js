import React, { useState } from 'react';
import Event from 'Components/Event/event.component';
import 'Components/EventList/eventList.styles.css';


const EventList = ({ events }) => {

console.log(events)
  return (
    <div className="event-list-container">
      {!events.length > 0 ? (
        <div className="no-results">
          Oh dear!<br></br> Your search returned no events.
        </div>
      ) :
        
        (
        Object.entries(events)
        .map(({ id, ...otherEventProps }) => <Event key={id} {...otherEventProps} />)
        )
      
      
      }
    </div>
  );
};

export default EventList;
