import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/App.scss';
import Navigation from './components/Navigation/Navigation';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Events from './components/Events/Events';
import Expand from './components/Expand/Expand';
import DestinationInfo from './components/DestinationInfo/DestinationInfo';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/events" component={Events} />
          <Route path="/expand" component={Expand} />
          <Route path="/destinations/:name" component={DestinationInfo} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
