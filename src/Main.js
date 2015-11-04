import React, { PropTypes, Component, ContextTypes } from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, Route, Link, IndexRoute } from 'react-router';

const Navigation = () => {
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

const Contact = () => <h3>Contact</h3>;
const About = () => <h3>About</h3>;
const Home = () => <h3>Home</h3>;

const App = (props) => {
  return (
    <div>
      <h1>App</h1>
      <Navigation />
      {props.children}
    </div>
  )
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
    )
  }
}
