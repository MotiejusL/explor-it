import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      width: 0,
      display: false,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  }

  handleClick = () => {
    this.setState((prevState) => ({ display: !prevState.display }));
  }

  setNavHeight = () => {
    const { width, display } = this.state;
    const biggerThanTablet = (width > 768);
    if (biggerThanTablet) {
      return {};
    }
    return display ? { maxHeight: '25%' } : { maxHeight: '0' };
  }

  setLinksOpacity = () => {
    const { width, display } = this.state;
    const biggerThanTablet = (width > 768);
    if (biggerThanTablet) {
      return {};
    }
    return (display ? { opacity: '1', transition: 'opacity 1.2s' } : { opacity: '0', transition: 'opacity 0.2s' });
  }

  setOpenCloseButtonsDisplay = (open) => {
    const { width, display } = this.state;
    const tabletWidth = (width > 768);
    if (tabletWidth) {
      return { display: 'none' };
    } if (open) {
      return (display ? { display: 'none' } : { display: 'block' });
    }
    return (display ? { display: 'block' } : { display: 'none' });
  }

  render() {
    return (
      <div style={this.setNavHeight()} className="nav-container">
        <i style={this.setOpenCloseButtonsDisplay(true)} className="fas fa-bars open" onClick={this.handleClick}> </i>
        <i style={this.setOpenCloseButtonsDisplay(false)} className="fas fa-minus close" onClick={this.handleClick}> </i>
        <nav>
          <ul className="navigation-list">
            <Link to="/" style={this.setLinksOpacity()} onClick={this.handleClick}>
              <li style={this.setLinksOpacity()} className="navigation-list-item">Home</li>
            </Link>
            <Link to="/events" style={this.setLinksOpacity()} onClick={this.handleClick}>
              <li style={this.setLinksOpacity()} className="navigation-list-item">Events</li>
            </Link>
            <Link to="/expand" style={this.setLinksOpacity()} onClick={this.handleClick}>
              <li style={this.setLinksOpacity()} iclassName="navigation-list-item">Expand</li>
            </Link>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navigation;
