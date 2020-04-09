import React, { Component } from 'react';
import Map from 'Components/Map/map.component';
import Form from 'Components/Form/form.component';
import EventList from 'Components/EventList/eventList.component';
import Header from 'Components/Header/header.component';
import { eventsFetch } from 'API/MobilizeFetch';
import 'Components/App.css';

const MOBILZE_BASE_URL = 'https://api.mobilize.us/v1/events?per_page=100';

class App extends Component {
  state = {
    fetchedEvents: [],
    requestURL: MOBILZE_BASE_URL,
  };
  componentDidMount = async () => {
    console.log('start');
    const response = await eventsFetch(this.state.requestURL);
    const data = await response.json();
    const fetchedEvents = await data.data.map((event) => {
      return {
        id: event.id,
        eventType: event.event_type,
        title: event.title,
        details: event.description,
        zipcode: event.location?.postal_code || null,
        coordinates: event.location?.location || null,
        eventDate: {
          start: event.timeslots[0]?.start_date || null,
          end_date: event.timeslots[0]?.end_date || null,
        },
        url: event.browser_url || null,
        eventImg: event.featured_image_url || null,
      };
    });
    console.log(fetchedEvents);
    this.setState({ fetchedEvents });
  };
  upDateRequestUrl = (input) => {
    this.setState((prevState) => ({ requestURL: prevState + input }));
  };
  render() {
    console.log(this.state);
    console.log('once or twice');
    return (
      <div>
        <Header />
        <div className="body">
          <EventList events={this.state.fetchedEvents} />
          <div className="main-page">
            <Form />
            <Map />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
