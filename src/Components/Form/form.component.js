import React, { Component, useState } from 'react';
import AddEventFilter from 'Components/Form/AddEventFilter/addEventFilter.component';
import 'Components/Form/form.styles.css';

const validZipCodeRegEx = /^(\d{5}(?:-\d{4})?)$/;
const MOBILZE_BASE_URL = 'https://api.mobilize.us/v1/events';

const Form = ({ upDateRequestUrl }) => {
  const [query, setQuery] = useState('');
  const [eventTypeQuery, setEventTypeQuery] = useState([]);

  const zipcodeQuery = (event) => {
    event.preventDefault();
    upDateRequestUrl(query, event.target.name);
    console.log(event.target.name, query);
  };

  const clearCheckboxesFromForm = () =>
    document.querySelectorAll('input[type=checkbox]').forEach((el) => (el.checked = false));

  const handleEventTypeQuery = (event) => {
    event.preventDefault();
    upDateRequestUrl(query + doneAddingEvents());
    clearCheckboxesFromForm();
    setEventTypeQuery([]);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setEventTypeQuery(prevState => [...prevState, value]);
    console.log('this function is being called', eventTypeQuery);
  };

  const doneAddingEvents = () => {
    const moreInputs =
      eventTypeQuery.length > 1
        ? eventTypeQuery.map((type) => '&event_types=' + type).join('')
        : '&event_types=' + eventTypeQuery;
    console.log(query, 'and what is up with more', moreInputs);
    this.props.upDateRequestUrl(query, moreInputs);
    return moreInputs;
  };

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
        >
          Search
        </button>
      </form>
      <AddEventFilter handleChange={handleChange} eventTypeQuery={handleEventTypeQuery} />
    </div>
  );
};

export default Form;
