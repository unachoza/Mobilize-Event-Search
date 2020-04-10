import React, { Component } from 'react';
import Event from 'Components/Event/event.component';
import Pagination from 'Components/Pagination/pagination.component';
import 'Components/EventList/eventList.styles.css';

class EventList extends Component {
  state = {
    eventsPerPage: 5,
    currentPage: 1,
  };
  // this.props.events

  // Get current posts
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - eventsPerPage;

  render() {
    console.log("props foem here", this.props)
    const { currentPage, eventsPerPage } = this.state;
    const totalEvents = this.props.events.length;
    const lastEventIndex = currentPage * eventsPerPage;
    const firstEventIndex = lastEventIndex - eventsPerPage;
    const currentEventsDisplayed = this.props.events.slice(firstEventIndex, lastEventIndex);

    let pageNumbers = [];

    // CHANGE PAGE
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    //CREATE BUTTONS
    for (let i = 1; i <= Math.ceil(totalEvents / this.state.eventsPerPage); i++) {
      pageNumbers.push(i);
    }
    const { events } = this.props;
    console.log(events);
    // {items
    //       .filter((item, idx) => idx < 4)
    //       .map(item => (
    //         <CollectionItem key={item.id} item={item} />
    //       ))}
    return (
      <div className="event-list-container">
        {/* {Object.values(events)
          .filter((event, i) => i < 4)
          .map(({ id, ...otherEventProps }) => (
            <Event key={id} {...otherEventProps} />
          ))} */}
        {!events.length > 0 ? (
          <div className="no-results">
            Oh dear!<br></br> Your search returned no events.
          </div>
        ) : (
          Object.values(events)
            .filter((event, i) => i < 4)
            .map(({ id, ...otherEventProps }) => <Event key={id} {...otherEventProps} />)
        )}
        {events.length > 0 && <Pagination events={events} />}
      </div>
    );
  }
}

export default EventList;
