import React from 'react';
import Event from 'Components/Event/event.component';
import 'Components/EventList/eventList.styles.css';
import LoadingSpinner from 'Components/loadingSpinner/loadingSpinner.component';


const EventList = ({ events, lastEventElementRef, loading }) => {
  // console.log('is it ever loading', loading)

  return (
    <div className="event-list-container">
      {!events.length > 0 ? (
        <div className="no-results">
          Oh dear!<br></br> Your search returned no events.
        </div>
      ) :
        (
        Object.entries(events)
            .map((event, i) => {
              return (events.length === i + 1) ?
                <div ref={lastEventElementRef} key={i}>{event.title}</div>
                : <Event key={i} event={event} />
            })
        )
      
      
      }
      {loading && <LoadingSpinner loading={loading} />}
       {/* <div>{error && 'Error'}</div> */}
    </div>
  );
};

export default EventList;
