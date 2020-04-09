import React, { Component } from 'react';
import Map from 'Components/Map/map.component';

class App extends Component {
  render() {
    return (
      <div>
      <div>Search Mobilze API for events displayed on map</div>
      <Map/>
      </div>
    );
  }
}

export default App;
