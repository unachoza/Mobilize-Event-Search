import React from 'react';
import EventTag from 'Components/EventTag/eventTag.component'
import 'Components/Event/event.styles.css'

const Event = (otherEventProps) => {
  const getDate = (unixTimestamp) => {
    const milliseconds = unixTimestamp * 1000; // 1575909015000
    const dateObject = new Date(milliseconds);
    const DateFormat = dateObject.toLocaleString();
    const humanDateFormat = DateFormat.replace(':00', '');
    return humanDateFormat;
  };
 
  
  const { title, details, showDetails, eventDate, show, eventType } = otherEventProps;
  return (
    <div className="event-card">
      <div className="event-card__date">{getDate(eventDate.start)} </div>
      
      <div className="event-card__title" >
        {title.toUpperCase()}
      </div>

      {showDetails ? <div className="event-card__description">{details}</div> : null}
      <EventTag tag={eventType}/>
    </div>
  );
};

export default Event;
