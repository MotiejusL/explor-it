import React, { PureComponent } from 'react';

class EventForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      eventName: '',
      eventDate: '',
      eventTime: '',
      eventCity: '',
      eventDescription: '',
      eventCountryName: '',
      responseMessage: '',
      gotError: false,
    };
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
        countryName: eventCountryName,
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
  }

  render() {
    const {
      eventName, eventDate, eventTime, eventCity, eventDescription, eventCountryName, responseMessage, gotError,
    } = this.state;
    return (
      <div className="expand-form">
        {responseMessage !== '' && gotError !== true ? <h4 className="success-submit">{responseMessage}</h4> : <h4 className="error-submit">{responseMessage}</h4>}
        <form>
          <ul>
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
                <input type="text" id="description" name="eventDescription" value={eventDescription} onChange={this.handleChange} />
              </label>
            </li>
            <li>
              <label htmlFor="country">
                Event country:
                <input type="text" id="country" name="eventCountryName" value={eventCountryName} onChange={this.handleChange} />
              </label>
            </li>
          </ul>
          <button className="main-button" type="button" onClick={this.handleSubmit}>Confirm</button>
        </form>
      </div>
    );
  }
}

export default EventForm;
