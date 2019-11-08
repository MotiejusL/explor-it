import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class EventForm extends PureComponent {
  static validateInput(arrayToCheck) {
    let invalidInput = false;
    const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    const timeRegex = /^((([0-1]?[0-9]|2[0-3]):[0-5][0-9])|(24:00))$/;
    arrayToCheck.forEach((input, index) => {
      if (input === '' || (index === 1 && !dateRegex.test(input)) || (index === 2 && !timeRegex.test(input))) {
        invalidInput = true;
      }
    });
    return invalidInput;
  }

  constructor() {
    super();
    this.state = {
      eventName: '',
      eventDate: '',
      eventTime: '',
      eventCity: '',
      eventDescription: '',
      responseMessage: '',
      gotError: false,
    };
  }

  getCountryOptions() {
    const { destinations } = this.props;
    const options = destinations.map((dest) => {
      return <option key={dest.name} value={dest.name}>{dest.name}</option>;
    });
    return options;
  }

  handleChange = (element) => {
    const { target } = element;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async () => {
    const {
      eventName, eventDate, eventTime, eventCity, eventDescription, eventCountryName,
    } = this.state;
    const { selectedCountry } = this.props;
    if (!EventForm.validateInput([eventName, eventDate, eventTime,
      eventCity, eventDescription, eventCountryName])) {
      const eventInsertResponse = await fetch(`https://travel-rest.herokuapp.com/rest/destinations/${eventCountryName}/events`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: eventName,
          date: eventDate,
          time: eventTime,
          city: eventCity,
          description: eventDescription,
          countryName: selectedCountry,
        }),
      });
      this.setState({
        eventName: '',
        eventDate: '',
        eventTime: '',
        eventCity: '',
        eventDescription: '',
        eventCountryName: '',
      });
      if (eventInsertResponse.status === 201) {
        this.setState({
          responseMessage: 'Thank you for helping us to expand our database!',
          gotError: false,
        });
      } else {
        this.setState({
          responseMessage: 'Sorry, something went wrong sending your data',
          gotError: true,
        });
      }
    } else {
      this.setState({ responseMessage: 'Bad date and time format or not all the fields filled!', gotError: true });
    }
  }

  render() {
    const {
      eventName, eventDate, eventTime, eventCity, eventDescription,
      responseMessage, gotError,
    } = this.state;
    const { handleCountryChange, selectedCountry } = this.props;
    return (
      <div className="expand-form">
        {responseMessage !== '' && gotError !== true ? <h4 className="success-submit">{responseMessage}</h4> : <h4 className="error-submit">{responseMessage}</h4>}
        <form>
          <ul>
            <li>
              <label htmlFor="country">
                Event country:
                <select id="country" name="selectedCountry" value={selectedCountry} onChange={handleCountryChange}>
                  <option>Select...</option>
                  {this.getCountryOptions()}
                </select>
              </label>
            </li>
            <li>
              <label htmlFor="name">
                Event name:
                <input type="text" id="name" name="eventName" value={eventName} onChange={this.handleChange} />
              </label>
            </li>
            <li>
              <label htmlFor="date">
                Event date:
                <span>date should be in YYYY-MM-DD format</span>
                <input type="text" id="date" name="eventDate" value={eventDate} onChange={this.handleChange} />
              </label>
            </li>
            <li>
              <label htmlFor="time">
                Event time:
                <span>time should be in HH:MM format</span>
                <input type="text" id="time" name="eventTime" value={eventTime} onChange={this.handleChange} />
              </label>
            </li>
            <li>
              <label htmlFor="city">
                Event city:
                <input type="text" id="city" name="eventCity" value={eventCity} onChange={this.handleChange} />
              </label>
            </li>
            <li>
              <label htmlFor="description">
                Event description:
                <textarea id="description" name="eventDescription" value={eventDescription} onChange={this.handleChange}> </textarea>
              </label>
            </li>
          </ul>
          <button className="main-button" type="button" onClick={this.handleSubmit}>Confirm</button>
        </form>
      </div>
    );
  }
}

EventForm.propTypes = {
  destinations: PropTypes.arrayOf(PropTypes.object),
  selectedCountry: PropTypes.string,
  handleCountryChange: PropTypes.func,
};

EventForm.defaultProps = {
  destinations: null,
  selectedCountry: '',
  handleCountryChange: null,
};

export default EventForm;
