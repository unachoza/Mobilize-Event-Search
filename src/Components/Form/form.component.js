import React, { Component } from 'react';
import 'Components/Form/form.styles.css';

const eventTypes = [
  'CANVASS',
  'PHONE BANK',
  'FUNDRAISER',
  'VOTER REG',
  'TRAINING',
  'DEBATE WATCH PARTY',
  'TOWN HALL',
  'BARNSTORM',
  'SIGNATURE GATHERING',
];

// const submit = (values) => {
//   console.log('these are the values', values);
// };

// const validZipCodeRegEx = /^(\d{5}(?:\-\d{4})?)$/;
// const MOBILZE_BASE_URL = 'https://api.mobilize.us/v1/events';

class Form extends Component {
  state = {
    errorMessage: null,
    query: '',
  };

  // componentDidMount() {
  //   console.log(this.state);
  // }

  // componentDidUpdate(prevstate, props) {
  //   console.log(prevstate.zipCodeQuery, 'that wasquery ', this.props.zipCodeQuery);
  //   // Typical usage (don't forget to compare props):
  //   console.log(this.props.fetchEventsRequestAsync(this.props.zipCodeQuery));
  //   if (prevstate.zipCodeQuery !== this.props.zipCodeQuery) {
  //     this.props.showEventDetails();
  //     this.props.fetchEventsRequestAsync(this.props.zipCodeQuery);
  //   }
  // }

  // validateZipCode = (input) => {
  //   console.log('input begin validataioned', `${MOBILZE_BASE_URL}?zipcode=${input}`);
  //   !input.match(validZipCodeRegEx)
  //     ? this.setState({ errorMessage: 'please enter valid zip code' })
  //     : this.setState({ query: `${MOBILZE_BASE_URL}?zipcode=${input}` });
  //   console.log(this.state, 'after validate func');
  // };
  formFunc = (event) => {
    event.preventDefault();
    console.log('wo');
    this.props.upDateRequestUrl(this.state.query);
  };

  render() {
    console.log('everytie', this.props);
    console.log(this.state);
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
            onClick={this.formFunc}
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
        <form className="form">
          {eventTypes.map((event, i) => {
            return (
              <div key={i} className="event-type-option">
                <input type="checkbox" id={event} name={event} value={event} hidden />
                <label for={event}>{event.toLowerCase()}</label>
              </div>
            );
          })}
        </form>
      </div>
    );
  }
}

export default Form;
