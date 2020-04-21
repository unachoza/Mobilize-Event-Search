import React, { Component } from 'react';
import AddEventFilter from 'Components/Form/AddEventFilter/addEventFilter.component';
import 'Components/Form/form.styles.css';

const validZipCodeRegEx = /^(\d{5}(?:-\d{4})?)$/;
const MOBILZE_BASE_URL = 'https://api.mobilize.us/v1/events';

class Form extends Component {
  state = {
    errorMessage: null,
    query: '',
    eventTypeQuery: [],
  };
  zipcodeQuery = (event) => {
    event.preventDefault();
    this.props.oldUpdateRequestUrl(this.state.query)
    // this.props.upDateRequestUrl(this.state.query, event.target.name);
  };

  clearCheckboxesFromForm = () => {
    document.querySelectorAll('input[type=checkbox]').forEach((el) => (el.checked = false));
    console.log('clearing');
  };

  eventTypeQuery = (event) => {
    console.log(this.state, 'in this func eventTypeQuesr');
    event.preventDefault();
    this.props.oldUpDateRequestUrl(this.state.query + this.doneAddingEvents());
    this.setState({ eventTypeQuery: [] });
    this.clearCheckboxesFromForm();
    this.handleChange = (event) => {
    const { value } = event.target;
    this.setState((prevState) => ({ eventTypeQuery: [...prevState.eventTypeQuery, value] }));
    console.log(this.state.eventTypeQuery)
  };

  };

  handleChange = (event) => {
    console.log('in handle change', this.state);
    const { value } = event.target;
    this.setState((prevState) => ({ eventTypeQuery: [...prevState.eventTypeQuery, value] }));
  };

  doneAddingEvents = (event) => {
    event.preventDefault();
    const moreInputs = this.state.eventTypeQuery.length > 1 ?
      this.state.eventTypeQuery.map(type => '&event_types=' + type).join('') : '&event_types=' + this.state.eventTypeQuery;
    this.props.oldUpDateRequestUrl(this.state.query, moreInputs);
    return moreInputs
      
    // const param = 'event_type';
    // const input = this.state.eventTypeQuery;
    // this.props.upDateRequestUrl(param, input);
  };

  collectionEventTypeQueries = (label) => {
    this.setState({ eventTypeQuery: [...this.state.eventTypeQuery, label.target.name] });
    console.log(this.state);
  };
  render() {
 console.log(this.state)
    
    const { zipcodeQuery, handleChange, eventTypeQuery, collectionEventTypeQueries, doneAddingEvents } = this;
    return (
      <div className="form-container">
        <form className="zip-input">
          <input
            className="zip-input"
            placeholder="enter zip code"
            type="text"
            name="zipcode"
            onBlur={(e) => this.setState({ query: e.target.value })}
          />
          <button
            onClick={zipcodeQuery}
            className="zipcode"
            name="zipcode"
            style={{
              height: '37px',
              position: 'absolute',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
              fontWeight: '450',
            }}
          >
            Search
          </button>
        </form>
        <AddEventFilter handleChange={handleChange}
          eventTypeQuery={eventTypeQuery}collectionEventTypeQueries={collectionEventTypeQueries} doneAddingEvents={doneAddingEvents} />
      </div>
    );
  }
}

export default Form;
