import React from 'react'
import { render } from 'react-dom'
import { createHistory } from 'history'
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router'
import ContactStore from './ContactStore'

const App = React.createClass({
  getInitialState() {
    return {
      contacts: ContactStore.getContacts(),
      loading: true
    }
  },

  componentWillMount() {
    ContactStore.init()
  },

  componentDidMount() {
    ContactStore.addChangeListener(this.updateContacts)
  },

  componentWillUnmount() {
    ContactStore.removeChangeListener(this.updateContacts)
  },

  updateContacts() {
    if (!this.isMounted())
      return

    this.setState({
      contacts: ContactStore.getContacts(),
      loading: false
    })
  },

  render() {
    const contacts = this.state.contacts.map((contact) =>
      <li key={contact.id}><Link to={`/contact/${contact.id}`}>{contact.first}</Link></li>
    )
    return (
      <div className='App'>
        <div className='ContactList'>
          <Link to='/contact/new'>New Contact</Link>
          <ul>
            {contacts}
          </ul>
          <Link to='/notFound'>Invalid Link (not found)</Link>
        </div>
        <div className='Content'>
          { this.props.children }
        </div>
      </div>
    )
  }
})

const Index = React.createClass({
  render() {
    return <h1>Address Book</h1>
  }
})

const Contact = React.createClass({
  getStateFromStore(props) {
    const { id } = props ? props.params : this.props.params
    return {
      contact: ContactStore.getContact(id)
    }
  },

  getInitialState() {
    return this.getStateFromStore()
  },

  componentDidMount() {
    ContactStore.addChangeListener(this.updateContact)
  },

  componentWillUnmount() {
    ContactStore.removeChangeListener(this.updateContact)
  },

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromStore(nextProps))
  },

  updateContact() {
    if (!this.isMounted())
      return

    this.setState(this.getStateFromStore())
  },

  destroy() {
    const id = this.props.params.id
    ContactStore.removeContact(id)
    this.props.history.pushState(null, '/')
  },

  render() {
    const contact = this.state.contact || {}
    const name = contact.first + ' ' + contact.last
    const avatar = contact.avatar || 'http://placecage.com/50/50'
    return (
      <div className='Contact'>
        <img height='50' src={avatar} key={avatar}/>
        <h3>{name}</h3>
        <button onClick={this.destroy}>Delete</button>
      </div>
    )
  }
})

const NewContact = React.createClass({
  createContact(event) {
    event.preventDefault()
    ContactStore.addContact({
      first: this.refs.first.value,
      last: this.refs.last.value
    }, (contact) => {
      this.props.history.pushState(null, `/contact/${contact.id}`)
    })
  },

  render() {
    return (
      <form onSubmit={this.createContact}>
        <p>
          <input type='text' ref='first' placeholder='First name'/>
          <input type='text' ref='last' placeholder='Last name'/>
        </p>
        <p>
          <button type='submit'>Save</button> <Link to='/'>Cancel</Link>
        </p>
      </form>
    )
  }
})

const NotFound = React.createClass({
  render() {
    return <h2>Not found</h2>
  }
})

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Index} />
    <Route path='contact/new' component={NewContact} />
    <Route path='contact/:id' component={Contact} />
    <Route path='*' component={NotFound} />
  </Route>
)

render(<Router>{ routes }</Router>, document.getElementById('example'))
