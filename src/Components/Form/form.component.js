import React, { Component } from 'react';
import AddEventFilter from 'Components/Form/AddEventFilter/addEventFilter.component';
import 'Components/Form/form.styles.css';

const validZipCodeRegEx =/^(\d{5}(?:-\d{4})?)$/
const MOBILZE_BASE_URL = 'https://api.mobilize.us/v1/events';

class Form extends Component {
  state = {
    errorMessage: null,
    zipQuery: '',
    eventTypeQuery: [],
  };

  // validateZipCode = (input) => {
  //   console.log('input begin validataioned' ,  !input.match(validZipCodeRegEx));
  //    !input.match(validZipCodeRegEx)
  //     && this.setState({ errorMessage: 'please enter valid zip code' })
  //     // : this.setState({ query: `${MOBILZE_BASE_URL}?zipcode=${input}` });
  //   console.log(this.state, 'after validate func');
  // };
  zipcodeQuery = (event) => {
    event.preventDefault();
    console.log('wo' );
    // this.validateZipCode(this.state.query)
    this.props.upDateRequestUrl(this.state.query);
  };

  eventTypeQuery = (event) => {
    event.preventDefault();
    console.log('submitted', this.state);
    this.props.upDateRequestUrl(this.state.query + this.doneAddingEvents());
    document.querySelectorAll('input[type=checkbox]').forEach((el) => (el.checked = false));
    this.setState({ eventTypeQuery: [] });
  };
  handleChange = (event) => {
    const { value } = event.target;
    this.setState((prevState) => ({ eventTypeQuery: [...prevState.eventTypeQuery, value] }));
    console.log(this.state.eventTypeQuery);
  };
  doneAddingEvents = () => {
    const moreInputs =
      this.state.eventTypeQuery.length > 1
        ? this.state.eventTypeQuery.map((type) => '&event_types=' + type).join('')
        : '&event_types=' + this.state.eventTypeQuery;
    this.props.upDateRequestUrl(this.state.query, moreInputs);
    return moreInputs;
  };

  render() {
    
    const { handleChange, eventTypeQuery, zipcodeQuery } = this;
    return (
      <div className="form-container">
        <form className="zip-input">
          <label htmlFor="location"></label>
          <input
            id="zip-input"
            className="zip-input"
            placeholder="enter zip code"
            component="input"
            type="text"
            onBlur={(e) => this.setState({ query: e.target.value })}
          />
          <button
            type="submit"
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
