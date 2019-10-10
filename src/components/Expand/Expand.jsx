import React, { Component } from 'react';
import EventForm from '../EventForm/EventForm';
import CountryForm from '../CountryForm/CountryForm';

const components = {
  event: EventForm,
  country: CountryForm,
};

class Expand extends Component {
  constructor() {
    super();
    this.state = {
      selectedItem: '',
    };
  }

  handleChange = (element) => {
    const { target } = element;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { selectedItem } = this.state;
    const SelectedFormComponent = components[selectedItem.toLowerCase()];
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
          {(selectedItem !== '' && selectedItem !== 'Select...') && <SelectedFormComponent />}
        </div>
      </div>
    );
  }
}

export default Expand;
