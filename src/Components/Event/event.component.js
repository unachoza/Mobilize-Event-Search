import React from 'react';
import EventTag from 'Components/EventTag/eventTag.component'
import 'Components/Event/event.styles.css'

const Event = (otherEventProps) => {
  const getDate = (unixTimestamp) => {
    const dateObject = new Date(unixTimestamp * 1000).toLocaleString();
    return dateObject.replace(':00', '');
  };
  const { title, details, showDetails, eventDate, eventType, id } = otherEventProps;
  console.log(title, id, "here")
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
