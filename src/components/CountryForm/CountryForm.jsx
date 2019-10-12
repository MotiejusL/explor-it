import React, { PureComponent } from 'react';

class CountryForm extends PureComponent {
  static validateInput(arrayToCheck) {
    let invalidInput = false;
    const climateRegex = /^-?[1-4]?[0-9]$/;
    arrayToCheck.forEach((input, index) => {
      if (input === '' || ((index === 5 || index === 6) && !climateRegex.test(input))) {
        invalidInput = true;
      }
    });
    return invalidInput;
  }

  constructor() {
    super();
    this.state = {
      countryName: '',
      countryLanguage: '',
      countryCurrency: '',
      countryCapitalCity: '',
      countryGeneralInformation: '',
      countryClimateSummerAvg: '',
      countryClimateWinterAvg: '',
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
      countryName, countryLanguage, countryCurrency, countryCapitalCity,
      countryGeneralInformation, countryClimateSummerAvg, countryClimateWinterAvg,
    } = this.state;
    if (!CountryForm.validateInput([countryName, countryLanguage, countryCurrency,
      countryCapitalCity, countryGeneralInformation, countryClimateSummerAvg,
      countryClimateWinterAvg])) {
      const countryInsertResponse = await fetch('https://travel-rest.herokuapp.com/rest/destinations', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: countryName,
          language: countryLanguage,
          currency: countryCurrency,
          capitalCity: countryCapitalCity,
          generalInformation: countryGeneralInformation,
          climateSummerAvg: countryClimateSummerAvg,
          climateWinterAvg: countryClimateWinterAvg,
        }),
      });
      this.setState({
        countryName: '',
        countryLanguage: '',
        countryCurrency: '',
        countryCapitalCity: '',
        countryGeneralInformation: '',
        countryClimateSummerAvg: '',
        countryClimateWinterAvg: '',
      });
      let messageAndErrorObj;
      if (countryInsertResponse.status === 201) {
        messageAndErrorObj = {
          responseMessage: 'Thank you for helping us to expand our database!',
          gotError: false,
        };
      } else {
        messageAndErrorObj = {
          responseMessage: 'Sorry, something went wrong sending your data',
          gotError: true,
        };
      }
      this.setState(messageAndErrorObj);
    } else {
      this.setState({ responseMessage: 'Bad climate format or not all the fields filled!', gotError: true });
    }
  }

  render() {
    const {
      countryName, countryLanguage, countryCurrency, countryCapitalCity,
      countryGeneralInformation, countryClimateSummerAvg,
      countryClimateWinterAvg, responseMessage, gotError,
    } = this.state;
    return (
      <div className="expand-form">
        {responseMessage !== '' && gotError !== true ? <h4 className="success-submit">{responseMessage}</h4> : <h4 className="error-submit">{responseMessage}</h4>}
        <form>
          <ul>
            <li>
              <label htmlFor="name">
                Country name:
                <input name="countryName" id="name" value={countryName} onChange={this.handleChange} />
              </label>
            </li>
            <li>
              <label htmlFor="language">
                Country language:
                <input name="countryLanguage" id="language" value={countryLanguage} onChange={this.handleChange} />
              </label>
            </li>
            <li>
              <label htmlFor="currency">
                Country currency:
                <input name="countryCurrency" id="currency" value={countryCurrency} onChange={this.handleChange} />
              </label>
            </li>
            <li>
              <label htmlFor="capital">
                Country capital city:
                <input name="countryCapitalCity" id="capital" value={countryCapitalCity} onChange={this.handleChange} />
              </label>
            </li>
            <li>
              <label htmlFor="information">
                Country general information:
                <textarea name="countryGeneralInformation" id="information" value={countryGeneralInformation} onChange={this.handleChange}> </textarea>
              </label>
            </li>
            <li>
              <label htmlFor="summer">
                Country average climate in summer:
                <span>climate should be in &#8451;</span>
                <input name="countryClimateSummerAvg" id="summer" value={countryClimateSummerAvg} onChange={this.handleChange} />
              </label>
            </li>
            <li>
              <label htmlFor="winter">
                Country average climate in winter:
                <span>climate should be in &#8451;</span>
                <input name="countryClimateWinterAvg" id="winter" value={countryClimateWinterAvg} onChange={this.handleChange} />
              </label>
            </li>
          </ul>
          <button className="main-button" type="button" onClick={this.handleSubmit}>Confirm</button>
        </form>
      </div>
    );
  }
}

export default CountryForm;
