import React from 'react';
import PropTypes from 'prop-types';

function ModalImage(props) {
  const {
    image, name, displayModal, imgExitHandle,
  } = props;
  const displayStyle = displayModal ? { display: 'flex' } : { display: 'none' };
  return (
    <div style={displayStyle} className="modal-image">
      <img className="modal-image-inner" src={image} alt={name} />
      <button type="button" onClick={imgExitHandle}>
        <i className="fas fa-times"> </i>
      </button>
    </div>
  );
}

ModalImage.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  displayModal: PropTypes.bool,
  imgExitHandle: PropTypes.func,
};

ModalImage.defaultProps = {
  image: '',
  name: '',
  displayModal: false,
  imgExitHandle: null,
};

export default ModalImage;
