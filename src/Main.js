import React, { PropTypes, Component, ContextTypes } from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, Link, IndexRoute } from 'react-router';

const Navigation = (props) => {
  return (
    <div>
      <ul>
        <li><Link to='/' activeClassName='active'>Home</Link></li>
        <li><Link to='/about' activeClassName='active'>About</Link></li>
        <li><Link to='/contact' activeClassName='active'>Contact</Link></li>
      </ul>
    </div>
  );
};

export const Contact = (props) => <h3>Contact</h3>;
export const About = (props) => <h3>About</h3>;
export const Home = (props) => <h3>Home</h3>;

export class App extends Component {
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

export class Root extends Component {
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