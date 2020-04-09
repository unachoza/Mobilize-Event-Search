import React, { Component } from 'react';

class Pagination extends Component {
  state = {
    lastEventIndex: null,
    firstEventIndex: 1,
    eventsPerPage: 2,
    currentPage: 1,
  };

  render() {
    const totalEvents = this.props.events.length;
    const totalPages = totalEvents / this.state.eventsPerPage;
    // console.log(totalEvents, eventsPerPage, totalPages);
    // console.log('passed down', this.props);
    // console.log('on this component', this.state);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalEvents / this.state.eventsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="page-buttons-container">
        {pageNumbers.map((page, i) => (
          <li key={i} className="page-button">
            {page}
          </li>
        ))}

        <button className="page-button">Previous</button>
        <button className="page-button">Current Page</button>
        <button className="page-button">Next</button>
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
