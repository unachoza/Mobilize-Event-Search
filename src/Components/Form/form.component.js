import React, { useState } from 'react';
import AddEventFilter from 'Components/Form/AddEventFilter/addEventFilter.component';
import 'Components/Form/form.styles.css';

const validZipCodeRegEx = /^(\d{5}(?:-\d{4})?)$/;
const MOBILZE_BASE_URL = 'https://api.mobilize.us/v1/events';

const Form = (props) => {
  const [query, setQuery] = useState('');
  const [eventTypeQuery, setEventTypeQuery] = useState([]);
  const [addEventTypesVisible, setAddEventTypesVisible] = useState(false);

  const zipcodeQuery = (event) => {
    event.preventDefault();
    props.oldUpdateRequestUrl(query);
  };

  const clearCheckboxesFromForm = () => {
    document.querySelectorAll('input[type=checkbox]').forEach((el) => (el.checked = false));
  };

  const eventTypeQueries = (event) => {
    event.preventDefault();
    doneAddingEvents();
    setEventTypeQuery([]);
    clearCheckboxesFromForm();
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setEventTypeQuery([...eventTypeQuery, value]);
  };

  const doneAddingEvents = (event) => {
    event.preventDefault();
    const moreInputs =
      eventTypeQuery.length > 1
        ? eventTypeQuery.map((type) => '&event_types=' + type).join('')
        : '&event_types=' + eventTypeQuery;
    props.oldUpdateRequestUrl(query, moreInputs);
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
        {!addEventTypesVisible && (
          <button onClick={zipcodeQuery} className="zipcode">
            Search
          </button>
        )}
         {!addEventTypesVisible && <button className="zipcode" onClick={(e) => setAddEventTypesVisible(true)}>Add Filters</button>}
      </form>
     
      {addEventTypesVisible && <AddEventFilter handleChange={handleChange} doneAddingEvents={doneAddingEvents} />}
    </div>
  );
  // }
};

export default Form;
