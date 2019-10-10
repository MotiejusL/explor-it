import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import defaultImg from '../../default.png';

class EventCard extends PureComponent {
  constructor() {
    super();
    this.state = {
      image: null,
    };
  }

  async componentDidMount() {
    const { event } = this.props;
    const imageResponse = await fetch(`https://api.unsplash.com/search/photos?page=2&per_page=1&query=${event.name}&client_id=a7ddc1739f4ab86a6bae4d98b3537ed9ba06a2ba4a14a09ce279cecf1a696f42`);
    const image = await imageResponse.json();
    this.setState({ image: image.results[0] });
  }

  render() {
    const { image } = this.state;
    const { event } = this.props;
    const {
      name, date, time, city, description,
    } = event;
    return (
      <div className="event-card">
        <img src={image !== null ? image.urls.small : defaultImg} alt={event.name} />
        <ul>
          <li>
          Name
            <span>{name}</span>
          </li>
          <li>
          Date
            <span>{date}</span>
          </li>
          <li>
          Time
            <span>{time}</span>
          </li>
          <li>
          City
            <span>{city}</span>
          </li>
          <li>
          Description
            <span>{description}</span>
          </li>
        </ul>
      </div>
    );
  }
}

EventCard.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    city: PropTypes.string,
    description: PropTypes.string,
  }),
};

EventCard.defaultProps = {
  event: null,
};

export default EventCard;
