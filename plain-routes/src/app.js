import React from 'react'
import { render } from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router } from 'react-router'

const Home = () =>
  <h3>Home</h3>

const App = (props) =>
  <div>
    <h1>App</h1>
    {props.children}
  </div>

const routes = [{
  path: '/',
  component: App,
  indexRoute: {
    component: Home
  }
}]

const Root = () =>
  <Router history={createBrowserHistory()} routes={routes} />

render(<Root />, document.getElementById('root'));
