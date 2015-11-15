import React, { PropTypes, Component, ContextTypes } from 'react'
import { render } from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router'

const Navigation = (props, context) => {
  let inboxSubmenu = null
  if (context.history.isActive('/inbox')) {
    inboxSubmenu = (
      <ul>
        <li><Link to='/inbox/sent'>Sent</Link></li>
        <li><Link to='/inbox/messages'>My messages</Link></li>
      </ul>
    )
  }

  return (
    <div style={{ border: '10px solid #7f00ff' }}>
      <h3 style={{ color: '#7f00ff' }}>Navigation</h3>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
        <li><Link to='/inbox'>Inbox</Link></li>
        { inboxSubmenu }
      </ul>
    </div>
  )
}

Navigation.contextTypes = {
  history: PropTypes.object.isRequired
}

const Inbox = (props) =>
  <div>
    <h3 style={{ color: '#33CC66' }}>Inbox</h3>
    <ul>
      <li><Link to='/inbox'>Inbox</Link></li>
      <li><Link to='/inbox/sent'>Sent</Link></li>
      <li><Link to='/inbox/messages'>My messages</Link></li>
    </ul>
    <div style={{ border: '10px solid red' }}>
      {props.children}
    </div>
  </div>

const SentMessages = () =>
  <h4>Your sent messages</h4>

const Messages = () =>
  <h4>Messages</h4>

const Contact = () =>
  <h3 style={{ color: '#33CC66' }}>Contact</h3>

const About = () =>
  <h3 style={{ color: '#33CC66' }}>About</h3>

const Home = () =>
  <h3 style={{ color: '#33CC66' }}>Home</h3>

const App = (props) =>
  <div style={{ border: '10px solid #0099CC' }}>
    <h1 style={{ color: '#0099CC' }}>App</h1>
    <Navigation />
    <div style={{ border: '10px solid #33CC66' }}>{props.children}</div>
  </div>

const Root = () =>
  <Router history={createBrowserHistory()}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='about' component={About} />
      <Route path='contact' component={Contact} />
      <Route path='inbox' component={Inbox}>
        <IndexRoute component={Messages} />
        <Route path='sent' component={SentMessages} />
        <Redirect from='messages' to='/inbox' />
      </Route>
    </Route>
  </Router>


render(<Root />, document.getElementById('root'));
