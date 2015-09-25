import React, { PropTypes, Component } from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, Link, IndexRoute } from 'react-router';

class Navigation extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to='/'>Main</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
        </ul>
      </div>
    );
  }
};

class Contact extends Component {
  render() {
    return <div>Contact</div>;
  }
}

class About extends Component {
  render() {
    return ( <div>About</div> );
  }
}

class Home extends Component {
  render() {
    return <div>Home</div>;
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}

export default class Root extends Component {
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <Route path='/' component={App}>
          <IndexRoute component={Home} />
          <Route path='about' component={About} />
          <Route path='contact' component={Contact} />
        </Route>
      </Router>
    );
  }
}