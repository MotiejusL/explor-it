import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AutoComplete extends Component {
  componentDidUpdate(prevProps) {
    const { setShowAutoComplete, inputText } = this.props;
    if (prevProps.inputText !== inputText) {
      if (this.getAutoCompletedItems().length > 0) {
        setShowAutoComplete(true);
      } else {
        setShowAutoComplete(false);
      }
    }
  }

  getAutoCompletedItems() {
    const { allItems, inputText, onElementClick } = this.props;
    const filteredListItems = allItems.reduce((correctItems, item) => {
      if (item.toLowerCase().startsWith(inputText.toLowerCase()) && inputText !== '') {
        correctItems.push(
          <li key={item} onClick={onElementClick} onKeyDown={onElementClick}>
            <span>{inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase()}</span>
            {item.substr(inputText.length)}
          </li>,
        );
      }
      return correctItems;
    }, []);
    return filteredListItems;
  }

  render() {
    const { show } = this.props;
    return (
      <ul style={show ? { display: 'block' } : { display: 'none' }} className="auto-complete">
        {this.getAutoCompletedItems()}
      </ul>
    );
  }
}

AutoComplete.propTypes = {
  allItems: PropTypes.arrayOf(PropTypes.string),
  inputText: PropTypes.string,
  setShowAutoComplete: PropTypes.func,
  onElementClick: PropTypes.func,
  show: PropTypes.bool,
};

AutoComplete.defaultProps = {
  allItems: null,
  inputText: '',
  setShowAutoComplete: null,
  onElementClick: null,
  show: null,
};

export default AutoComplete;
