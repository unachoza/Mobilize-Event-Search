import React from 'react';
import 'Components/Event/event.styles.css'

const Event = (otherEventProps) => {
  const getDate = (unixTimestamp) => {
    const milliseconds = unixTimestamp * 1000; // 1575909015000
    const dateObject = new Date(milliseconds);
    const DateFormat = dateObject.toLocaleString();
    const humanDateFormat = DateFormat.replace(':00', '');
    return humanDateFormat;
  };

  const { title, details, showEventDetails, showDetails, eventDate, eventType } = otherEventProps;
  // console.log(showDetails);
  return (
    <div className="event-card">
      <div className="event-card__title" onClick={() => showEventDetails(otherEventProps)}>
        {title.toUpperCase()}
      </div>

      <div className="date"> When: {getDate(eventDate.start)} </div>
      {showDetails ? <div className="event-card__description">{details}</div> : null}
    </div>
  );
};

export default Event;
