import React, { Component } from 'react';
import "Components/Pagination/pagination.styles.css"

class Pagination extends Component {
  state = {
    eventsPerPage: 5,
    currentPage: 1,
  };

  // Get current posts
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - eventsPerPage;

  render() {
    const {  currentPage, eventsPerPage } = this.state;
    const totalEvents = this.props.events.length;
     const totalPages = Math.ceil(totalEvents / eventsPerPage)
   const lastEventIndex = currentPage * eventsPerPage;
   const firstEventIndex = lastEventIndex - eventsPerPage
    const currentEventsDisplayed = this.props.events.slice(firstEventIndex, lastEventIndex);
   
   let pageNumbers = [];
   
   
    // CHANGE PAGE
    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    //CREATE BUTTONS
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
   const pageButtons = ['1','<', '#', '>', totalPages]

    return (
      <div className="page-buttons-container">
       { pageButtons.lenght > 1 ? pageButtons.map((page, i) => (
          <li key={i} className="page-button">
            <a onClick={() => paginate(page)} href="!#" className="page-link">
              {page}
            </a>
          </li>
        )): null }
        
      </div>
    );
  }
}

export default Pagination;


