import React, { Component } from 'react';
import Event from 'Components/Event/event.component';
import Pagination from 'Components/Pagination/pagination.component'



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
  const { currentPage, eventsPerPage } = this.state;
  const totalEvents = this.props.events.length;
  const lastEventIndex = currentPage * eventsPerPage;
  const firstEventIndex = lastEventIndex - eventsPerPage
  const currentEventsDisplayed = this.props.events.slice(firstEventIndex, lastEventIndex);
   
  let pageNumbers = [];
   
   
  // CHANGE PAGE
  const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

  //CREATE BUTTONS
  for (let i = 1; i <= Math.ceil(totalEvents / this.state.eventsPerPage); i++) {
   pageNumbers.push(i);
  }
 const{events} = this.props
  console.log(events)
  return (
   <div className="event-list-container">
    <div className="event-list__title">List of Events from Mobilize API</div>
    {Object.values(events).map(({ id, ...otherEventProps }) => (
     <Event key={id} {...otherEventProps} />
    ))}
    <Pagination events={events} />
   </div>
  );
 }
}




export default EventList;

