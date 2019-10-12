import React from 'react';
import PropTypes from 'prop-types';

function ModalImage(props) {
  const {
    image, name, displayModal, imgExitHandle, info,
  } = props;
  const displayStyle = displayModal ? { display: 'flex' } : { display: 'none' };
  let infoInModal;
  let count = 0;
  if (info !== null) {
    infoInModal = info.map((infoItem) => {
      count += 1;
      return <li key={`info${count}`}>{infoItem}</li>;
    });
  }
  return (
    <div style={displayStyle} className="modal-image">
      <img className={info !== null ? 'modal-image-inner small' : 'modal-image-inner'} src={image} alt={name} />
      {info !== null && (
        <div className="modal-info">
          <ul>
            {infoInModal}
          </ul>
        </div>
      )}
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
  info: PropTypes.arrayOf(PropTypes.string),
};

ModalImage.defaultProps = {
  image: '',
  name: '',
  displayModal: false,
  imgExitHandle: null,
  info: null,
};

export default ModalImage;
