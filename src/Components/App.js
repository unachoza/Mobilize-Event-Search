import React, { Component } from 'react';
import Map from 'Components/Map/map.component';
import { eventsFetch } from 'API/MobilizeFetch';

const MOBILZE_BASE_URL = 'https://api.mobilize.us/v1/events';

class App extends Component {
 state = {
  fetchedEvents: [],
  requestURL: MOBILZE_BASE_URL
 }
  componentDidMount = async () => {
   console.log('start');
    const response = await eventsFetch(this.state.requestURL);
    const data = await response.json();
    const fetchedEvents = await data.data.map((event, i) => {
     console.log("this is being fetched", event);
      return { 
        id: event.id,
        eventType: event.event_type,
        title: event.title,
        details: event.description,
        zipcode: event.location?.postal_code || null,
        coordinates: event.location?.location || null,
        eventDate: {
          start: (event.timeslots[0])?.start_date || null,
          end_date: event.timeslots[0]?.end_date || null,
        },
        url: event.browser_url || null,
        eventImg: event.featured_image_url || null,
      };
    });
   console.log(fetchedEvents)
   this.setState({fetchedEvents})
  };
 upDateRequestUrl = (input) => {
 this.setState(prevState => ({requestURL: prevState + input}))
 }
 render() {
  console.log(this.state)
  console.log('once or twice')
    return (
      <div>
        <div>Search Mobilze API for events displayed on map</div>
        <Map />
      </div>
    );
  }
}

export default App;
