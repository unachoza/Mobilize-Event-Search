import React, { Component } from 'react';
import EventTag from 'Components/EventTag/eventTag.component';
import 'Components/Event/event.styles.css';
import { render } from '@testing-library/react';
// import { showEventDetails } from 'API/MobilizeFetch';

class Event extends Component {
  state = {
    yes: null,
  };

  getDate = (unixTimestamp) => {
    const dateObject = new Date(unixTimestamp * 1000).toLocaleString();
    return dateObject.replace(':00', '');
  };
   showEventDetails = () => {
     console.log(this.props[1].details)
     this.setState({ yes: true })
     console.log(this.state)
    return <div className="event-card__description">{this.props[1].details}</div>
  }
  render() {
    console.log(this.props[1]);
    console.log(this.props);
    const { title, details, showDetails, eventDate, eventType, id } = this.props[1];

    return (
      <div className="event-card" onClick={() => this.showEventDetails()}>
        <div className="event-card__date">{this.getDate(eventDate.start)} </div>
        <div className="event-card__title" onClick={() => this.showEventDetails()}>
          {title.toUpperCase()}
        </div>
 {this.state.yes ? <div className="event-card__description">{details}</div> : null} 
        <EventTag tag={eventType} />
      </div>
    );
  }
}

export default Event;

//  <div className="event-card" >
//         <div className="event-card__date">{this.getDate(eventDate.start)} </div>
//         <div className="event-card__title" >
//           {title.toUpperCase()}
//         </div>

//         {/* {otherEventProps[1].showDetails ? <div className="event-card__description">{details}</div> : null} */}
//         <EventTag tag={eventType} />
//       </div>
