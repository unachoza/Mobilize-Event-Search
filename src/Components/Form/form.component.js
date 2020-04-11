import React, { Component } from 'react';
import AddEventFilter from 'Components/Form/AddEventFilter/addEventFilter.component';
import 'Components/Form/form.styles.css';

const validZipCodeRegEx =/^(\d{5}(?:-\d{4})?)$/
const MOBILZE_BASE_URL = 'https://api.mobilize.us/v1/events';

class Form extends Component {
  state = {
    errorMessage: null,
    query: '',
    eventTypeQuery: [],
  };
 
  zipcodeQuery = (event) => {
    event.preventDefault();
    this.props.upDateRequestUrl(this.state.query);
  };
  
  clearCheckboxesFromForm = () =>  document.querySelectorAll('input[type=checkbox]').forEach((el) => (el.checked = false));

  eventTypeQuery = (event) => {
    event.preventDefault();
    this.props.upDateRequestUrl(this.state.query + this.doneAddingEvents());
   this.clearCheckboxesFromForm()
    this.setState({ eventTypeQuery: [] });
  };
  
  handleChange = (event) => {
    const { value } = event.target;
    this.setState((prevState) => ({ eventTypeQuery: [...prevState.eventTypeQuery, value] }));
  };
  
  doneAddingEvents = () => {
    const moreInputs =
      this.state.eventTypeQuery.length > 1
        ? this.state.eventTypeQuery.map((type) => '&event_types=' + type).join('')
        : '&event_types=' + this.state.eventTypeQuery;
    console.log(this.state.query, 'and what is up with more', moreInputs)
    this.props.upDateRequestUrl(this.state.query, moreInputs);
    return moreInputs;
  };

  render() {
    
    const { handleChange, eventTypeQuery, zipcodeQuery } = this;
    return (
      <div className="form-container">
        <form className="zip-input">
          <input
            className="zip-input"
            placeholder="enter zip code"
            type="text"
            onBlur={(e) => this.setState({ query: e.target.value })}
          />
          <button
            onClick={zipcodeQuery}
            className="zipcode"
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
        <AddEventFilter handleChange={handleChange} eventTypeQuery={eventTypeQuery} />
      </div>
    );
  }
}

export default Form;
