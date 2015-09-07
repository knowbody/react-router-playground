import React from 'react';
import { Router, Route, Link } from 'react-router';

class About { render() { return <div>About</div> } };
class Inbox { render() { return <div>Inbox</div> } };

class Home {
  render() {
    return (
      <div>
        <h3>With React Router</h3>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default class Root {
  render() {
    return (
      <Router>
        <Route path='/' component={Home}>
          <Route path='about' component={About} />
          <Route path='inbox' component={Inbox} />
        </Route>
      </Router>
    );
  }
}