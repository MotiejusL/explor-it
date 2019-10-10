import React, { Component } from 'react';
import EventCard from '../EventCard/EventCard';
import AutoComplete from '../AutoComplete/AutoComplete';

class Events extends Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      events: [],
      notFound: false,
      countries: [],
      showAutoComplete: false,
    };
  }

  async componentDidMount() {
    const destinationsResponse = await fetch('https://travel-rest.herokuapp.com/rest/destinations');
    const destinations = await destinationsResponse.json();
    this.setState({ countries: destinations.countries });
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
    } = this.state;
    const countryNames = countries.map((country) => country.name);
    let eventComponents;
    if (events !== undefined) {
      eventComponents = events.map((event) => <EventCard key={event.id} event={event} />);
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
              <button type="button" onClick={this.handleSearch}>
              Search
                <i className="fas fa-search"> </i>
              </button>
              <h3>{notFound && 'Sorry, no events were found'}</h3>
            </div>
            <div className="events-all-events">
              {eventComponents}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
