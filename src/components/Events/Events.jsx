import React, { Component } from 'react';
import EventCard from '../EventCard/EventCard';
import AutoComplete from '../AutoComplete/AutoComplete';
import ModalImage from '../ModalImage/ModalImage';

class Events extends Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      events: [],
      notFound: false,
      notSelected: true,
      countries: [],
      showAutoComplete: false,
      eventInModal: null,
      imgInModal: null,
      displayModal: false,
    };
  }

  async componentDidMount() {
    const destinationsResponse = await fetch('https://travel-rest.herokuapp.com/rest/destinations');
    const destinations = await destinationsResponse.json();
    this.setState({ countries: destinations.countries });
  }

  handleEventClick = (image, event) => {
    this.setState({ imgInModal: image, eventInModal: event, displayModal: true });
  }

  imgExitHandle = () => {
    this.setState({ displayModal: false });
  }

  handleChange = (element) => {
    const { target } = element;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSearch = (element) => {
    const { keyCode, type } = element;
    const { nodeName, textContent } = element.currentTarget;
    const { inputText } = this.state;
    if (keyCode === 13 || type === 'click') {
      return nodeName === 'INPUT' || nodeName === 'BUTTON' ? this.fetchEvents(inputText) : this.fetchEvents(textContent);
    }
    return null;
  }

  setShowAutoComplete = (set) => {
    this.setState({ showAutoComplete: set });
  }

  setShowAutoCompleteForElements = (event) => {
    event.stopPropagation();
    const { nodeName, value } = event.currentTarget;
    if (nodeName === 'INPUT' && value !== '') {
      this.setState({ showAutoComplete: true });
    } else {
      this.setState({ showAutoComplete: false });
    }
  }

  async fetchEvents(country) {
    this.setState({ notSelected: false });
    const eventsResponse = await fetch(`https://travel-rest.herokuapp.com/rest/destinations/${country}/events`);
    const events = await eventsResponse.json().catch(() => this.setState({ notFound: true, events: [] }));
    if (events !== undefined) {
      this.setState({ events, inputText: '', notFound: false });
      const { events: eventsFromState } = this.state;
      if (eventsFromState.length === 0) {
        this.setState({ notFound: true });
      }
    }
  }

  render() {
    const {
      inputText, events, notFound, countries, showAutoComplete,
      notSelected, imgInModal, eventInModal, displayModal,
    } = this.state;
    let warningMessage;
    if (notSelected === true) {
      warningMessage = 'Please select a country';
    } else if (notFound === true) {
      warningMessage = 'Sorry, no events were found';
    }
    const countryNames = countries.map((country) => country.name);
    let eventComponents;
    if (events !== undefined) {
      eventComponents = events.map((event) => <EventCard key={event.id} event={event} handleEventClick={this.handleEventClick}/>);
    }
    return (
      <div>
        <div className="pages-main-container" onClick={this.setShowAutoCompleteForElements}>
          <div className="events-page-container">
            <h1>Events</h1>
            <div className="events-search">
              <div className="input-with-auto-complete">
                <input style={showAutoComplete ? { borderBottomLeftRadius: '0', borderBottomRightRadius: '0' } : { bordeBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }} type="text" placeholder="Country name..." autoComplete="off" name="inputText" value={inputText} onChange={this.handleChange} onKeyDown={this.handleSearch} onClick={this.setShowAutoCompleteForElements} />
                <AutoComplete allItems={countryNames} inputText={inputText} setShowAutoComplete={this.setShowAutoComplete} onElementClick={this.handleSearch} show={showAutoComplete} />
              </div>
              <button className="main-button" type="button" onClick={this.handleSearch}>
              Search
                <i className="fas fa-search"> </i>
              </button>
              <h3>{warningMessage}</h3>
            </div>
            <div className="events-all-events">
              {eventComponents}
            </div>
          </div>
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
    );
  }
}

export default Events;
