import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalImage from '../ModalImage/ModalImage';

class DestinationInfo extends Component {
  constructor() {
    super();
    this.state = {
      country: {},
      photos: [],
      imgInModal: null,
      displayModal: false,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { name } = params;
    const countryResponse = await fetch(`https://travel-rest.herokuapp.com/rest/destinations/${name}`);
    const country = await countryResponse.json();
    this.setState({ country });
    this.fetchPhotos();
  }

  handleImgClick = (image) => {
    this.setState({ imgInModal: image, displayModal: true });
  }

  imgExitHandle = () => {
    this.setState({ displayModal: false });
  }

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  async fetchPhotos() {
    const { country } = this.state;
    const countryPhotosResponse = await fetch(`https://api.unsplash.com/search/photos?page=2&per_page=6&query=${country.name}&client_id=a7ddc1739f4ab86a6bae4d98b3537ed9ba06a2ba4a14a09ce279cecf1a696f42`);
    const countryPhotos = await countryPhotosResponse.json();
    this.setState({ photos: countryPhotos.results });
  }

  render() {
    const {
      country, photos, imgInModal, displayModal,
    } = this.state;
    const {
      name,
      language,
      capitalCity,
      currency,
      generalInformation,
      climateSummerAvg,
      climateWinterAvg,
    } = country;
    const photosImgs = photos.map((photo) => {
      return <img key={photo.id} src={photo.urls.small} alt={photo.urls.name} onClick={() => this.handleImgClick(photo)} onKeyDown={() => this.handleImgClick(photo)} />
    });
    return (
      <div className="pages-main-container">
        <div className="country-info-wrapper">
          <h1>{name}</h1>
          <div className="country-info-container">
            <ul>
              <li>
              Language
                <span>{language}</span>
              </li>
              <li>
              Currency
                <span>{currency}</span>
              </li>
              <li>
              Capital city
                <span>{capitalCity}</span>
              </li>
              <li>
              Climate in winter
                <span>
                  {climateWinterAvg}
                      &#8451;
                </span>
              </li>
              <li>
              Climate in summer
                <span>
                  {climateSummerAvg}
                      &#8451;
                </span>
              </li>
              <li>
              General information
                <span>{generalInformation}</span>
              </li>
            </ul>
          </div>
          <div className="country-photos-container">
            {photosImgs}
          </div>
          <button type="button" onClick={this.goBack}>
            <i className="fas fa-arrow-left"> </i>
            <span>Back</span>
          </button>
          {imgInModal !== null && (
          <ModalImage
            image={imgInModal.urls.regular}
            name={imgInModal.name}
            displayModal={displayModal}
            imgExitHandle={this.imgExitHandle}
          />
          )}
        </div>
      </div>
    );
  }
}

DestinationInfo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }),
  }),
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

DestinationInfo.defaultProps = {
  match: null,
};

export default DestinationInfo;
