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
   const pageButtons = ['<', '#', '>']

    return (
      <div className="page-buttons-container">
        {pageButtons.map((page, i) => (
          <li key={i} className="page-button">
            <a onClick={() => paginate(page)} href="!#" className="page-link">
              {page}
            </a>
          </li>
        ))}
        {/* <a onClick={() => paginate(page)} href="!#" className="page-link">
              {page}
            </a> */}

        {/* <button className="page-button">Previous</button>
        <button className="page-button">Current Page</button>
        <button className="page-button">Next</button> */}
      </div>
    );
  }
}

export default Pagination;

// const mapStateToProps = createStructuredSelector({
//   lastEventIndex: selectLastEventIndex,
//   firstEventIndex: selectFirstEventIndex,
//   events: selectFetchEvents,
//  eventsPerPage: selectEventsPerPage,
//   currentPage: selectCurrentPage
// });
