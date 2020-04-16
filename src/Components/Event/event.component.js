import React, { Component, useState } from 'react';
import EventTag from 'Components/EventTag/eventTag.component';
import 'Components/Event/event.styles.css';

const Event = (props) => {
  const [displayDetails, setDisplayDetails] = useState(false);

  const getDate = (unixTimestamp) => {
    const dateObject = new Date(unixTimestamp * 1000).toLocaleString();
    return dateObject.replace(':00', '');

    //how to get current events//
    //when was it updated since,
    //reoccuring
    //todays unix time stamp
  };
  const toggleDisplayDetails = () => {
    setDisplayDetails(!displayDetails);
  };
  const { title, details, eventDate, eventType } = props.event[1];
  return (
    <div className="event-card" onClick={toggleDisplayDetails}>
      <div className="event-card__date">{getDate(eventDate.start)} </div>
      <div className="event-card__title" onClick={toggleDisplayDetails}>
        {title.toUpperCase()}
      </div>
      {displayDetails ? <div className="event-card__description">{details}</div> : null}
      <EventTag tag={eventType} />
    </div>
  );
};

export default Event;

//  <div className="event-card" >
//         <div className="event-card__date">{this.getDate(eventDate.start)} </div>
//         <div className="event-card__title" >
//           {title.toUpperCase()}
//         </div>

//         {/* {otherEventProps[1].showDetails ? <div className="event-card__description">{details}</div> : null} */}
//         <EventTag tag={eventType} />
//       </div>
