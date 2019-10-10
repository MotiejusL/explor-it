import React, { Component } from 'react';
import DestinationCard from '../DestinationCard/DestinationCard';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      destinations: [],
    };
  }

  async componentDidMount() {
    const destinationsResponse = await fetch('https://travel-rest.herokuapp.com/rest/destinations');
    const destinations = await destinationsResponse.json();
    this.setState({ destinations: destinations.countries });
  }

  render() {
    const { destinations } = this.state;
    const destinationComponents = destinations.map((destination) => {
      return <DestinationCard key={destination.id} country={destination} />
    });
    return (
      <div>
        <div className="pages-main-container">
          <h1>Choose a country</h1>
          <div className="home-countries-container">
            {destinationComponents}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
