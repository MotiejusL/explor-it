import React, { Component } from 'react';
import EventForm from '../EventForm/EventForm';
import CountryForm from '../CountryForm/CountryForm';
import DestinationCard from '../DestinationCard/DestinationCard';
import EventCard from '../EventCard/EventCard';
import ModalImage from '../ModalImage/ModalImage';

const components = {
  event: EventForm,
  country: CountryForm,
};

class Expand extends Component {
  constructor() {
    super();
    this.state = {
      selectedItem: '',
      destinations: [],
      selectedCountry: '',
      events: [],
      eventInModal: null,
      imgInModal: null,
      displayModal: false,
    };
  }

  async componentDidMount() {
    const destinationsResponse = await fetch('https://travel-rest.herokuapp.com/rest/destinations');
    const destinations = await destinationsResponse.json();
    this.setState({ destinations: destinations.countries });
  }

  handleChange = (element) => {
    const { target } = element;
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, function findEvents() {
      if (name === 'selectedCountry') {
        this.fetchEvents();
      }
    });
  }

  fetchEvents = async () => {
    const { selectedCountry } = this.state;
    const eventsResponse = await fetch(`https://travel-rest.herokuapp.com/rest/destinations/${selectedCountry}/events`);
    const events = await eventsResponse.json();
    this.setState({ events });
  }

  handleEventClick = (image, event) => {
    this.setState({ imgInModal: image, eventInModal: event, displayModal: true });
  }

  imgExitHandle = () => {
    this.setState({ displayModal: false });
  }

  render() {
    const {
      selectedItem, destinations, selectedCountry, events,
      imgInModal, eventInModal, displayModal,
    } = this.state;
    const SelectedFormComponent = components[selectedItem.toLowerCase()];
    const destinationComponents = destinations.map((destination) => {
      return <DestinationCard key={destination.id} country={destination} />
    });
    let eventComponents;
    if (events !== undefined) {
      eventComponents = events.map((event) => <EventCard key={event.id} event={event} handleEventClick={this.handleEventClick} />);
    }
    let componentsToLoad;
    if (selectedItem === 'Country') {
      componentsToLoad = destinationComponents;
    } else if (selectedItem === 'Event') {
      componentsToLoad = eventComponents;
    }
    return (
      <div className="pages-main-container">
        <div className="expand-page-container">
          <h1>Expand</h1>
          <h3>Please select what you would like to add to our database</h3>
          <select name="selectedItem" value={selectedItem} onChange={this.handleChange}>
            <option>Select...</option>
            <option value="Event">Event</option>
            <option value="Country">Country</option>
          </select>
          <div className="form-cards-wrapper">
            <div className="expand-page-form">
              {(selectedItem !== '' && selectedItem !== 'Select...' && destinations !== []) && <SelectedFormComponent destinations={destinations} selectedCountry={selectedCountry} handleCountryChange={this.handleChange} />}
            </div>
            <div className="expand-page-cards">
              {componentsToLoad}
              <h3 className="choose-country">{((selectedCountry === '' || selectedCountry === 'Select...') && selectedItem === 'Event' && componentsToLoad.length === 0) && 'Please choose a country to add a new event'}</h3>
            </div>
            {(imgInModal !== null && eventInModal !== null) && (
            <ModalImage
              image={imgInModal.urls.regular}
              name={imgInModal.name}
              displayModal={displayModal}
              imgExitHandle={this.imgExitHandle}
              info={eventInModal}
            />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Expand;
