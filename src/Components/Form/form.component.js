import React, { useState } from 'react';
import AddEventFilter from 'Components/Form/AddEventFilter/addEventFilter.component';
import 'Components/Form/form.styles.css';

const validZipCodeRegEx = /^(\d{5}(?:-\d{4})?)$/;
const MOBILZE_BASE_URL = 'https://api.mobilize.us/v1/events';

const  Form= (props)=>{
  const [query, setQuery] = useState('')
  const [eventTypeQuery, setEventTypeQuery] = useState([])
 

  const zipcodeQuery = (event) => {
    event.preventDefault();
    props.oldUpdateRequestUrl(query);
    // this.props.upDateRequestUrl(this.state.query, event.target.name);
  };

  const clearCheckboxesFromForm = () => {
    document.querySelectorAll('input[type=checkbox]').forEach((el) => (el.checked = false));
  };

  const eventTypeQueries = (event) => {
    console.log('in this func eventTypeQuesr');
    event.preventDefault();
    this.doneAddingEvents()
    setEventTypeQuery([]);
    this.clearCheckboxesFromForm();
    // this.handleChange = (event) => {
    // const { value } = event.target;
    // this.setState((prevState) => ({ eventTypeQuery: [...prevState.eventTypeQuery, value] }));
    // console.log(this.state.eventTypeQuery)
    // };
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setEventTypeQuery((prevState) => ({ eventTypeQuery: [...prevState.eventTypeQuery, value] }));
  };

  const doneAddingEvents = (event) => {
    event.preventDefault();
    const moreInputs =
      eventTypeQuery.length > 1
        ? eventTypeQuery.map((type) => '&event_types=' + type).join('')
        : '&event_types=' + eventTypeQuery;
    this.props.oldUpdateRequestUrl(query, moreInputs);
    return moreInputs;

    // const param = 'event_type';
    // const input = this.state.eventTypeQuery;
    // this.props.upDateRequestUrl(param, input);
  };

  // const collectionEventTypeQueries = (label) => {
  //   this.setState({ eventTypeQuery: [...this.state.eventTypeQuery, label.target.name] });
  //   console.log(this.state);
  // };
  // render() {
    console.log('this is state from form')
    // const { zipcodeQuery, handleChange, eventTypeQueries, collectionEventTypeQueries, doneAddingEvents } = this;
    return (
      <div className="form-container">
        <form className="zip-input">
          <input
            className="zip-input"
            placeholder="enter zip code"
            type="text"
            name="zipcode"
            onBlur={(e) => setQuery(e.target.value)}
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
            onSubmit="return false"
          >
            Search
          </button>
        </form>
        <AddEventFilter
          handleChange={handleChange}
          eventTypeQueries={eventTypeQueries}
          // collectionEventTypeQueries={collectionEventTypeQueries}
          doneAddingEvents={doneAddingEvents}
        />
      </div>
    );
  // }
}

export default Form;
