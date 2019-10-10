import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultImg from '../../default.png';

class DestinationCard extends Component {
  constructor() {
    super();
    this.state = {
      countryPhotos: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchPhotos();
  }

  async fetchPhotos() {
    const { country } = this.props;
    const countryPhotosResponse = await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=1&query=${country.name}&client_id=a7ddc1739f4ab86a6bae4d98b3537ed9ba06a2ba4a14a09ce279cecf1a696f42`);
    const countryPhotos = await countryPhotosResponse.json();
    this.setState({ countryPhotos: countryPhotos.results, isLoading: false });
  }

  render() {
    const { country } = this.props;
    const { isLoading, countryPhotos } = this.state;
    return (
      <div className="destination-card">
        <Link to={`/destinations/${country.name}`}>
          <img src={isLoading ? defaultImg : countryPhotos[0].urls.small} alt={country.name} />
          <h2>{isLoading ? 'Loading...' : country.name}</h2>
          <div className="destination-card-darken"> </div>
        </Link>
      </div>
    );
  }
}

DestinationCard.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }),
};

DestinationCard.defaultProps = {
  country: null,
};

export default DestinationCard;
