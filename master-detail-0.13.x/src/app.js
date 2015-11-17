import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import ContactStore from './ContactStore'

var {
  Route,
  DefaultRoute,
  NotFoundRoute,
  RouteHandler,
  Link
} = Router

var App = React.createClass({
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
    var contacts = this.state.contacts.map(function (contact) {
      return <li key={contact.id}><Link to='contact' params={contact}>{contact.first}</Link></li>
    })
    return (
      <div className='App'>
        <div className='ContactList'>
          <Link to='new'>New Contact</Link>
          <ul>
            {contacts}
          </ul>
          <Link to='/nothing-here'>Invalid Link (not found)</Link>
        </div>
        <div className='Content'>
          <RouteHandler/>
        </div>
      </div>
    )
  }
})

var Index = React.createClass({
  render() {
    return <h1>Address Book</h1>
  }
})

var Contact = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getStateFromStore() {
    var id = this.context.router.getCurrentParams().id
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

  componentWillReceiveProps() {
    this.setState(this.getStateFromStore())
  },

  updateContact() {
    if (!this.isMounted())
      return

    this.setState(this.getStateFromStore())
  },

  destroy() {
    var { router } = this.context
    var id = router.getCurrentParams().id
    ContactStore.removeContact(id)
    router.transitionTo('/')
  },

  render() {
    var contact = this.state.contact || {}
    var name = contact.first + ' ' + contact.last
    var avatar = contact.avatar || 'http://placecage.com/50/50'
    return (
      <div className='Contact'>
        <img height='50' src={avatar} key={avatar}/>
        <h3>{name}</h3>
        <button onClick={this.destroy}>Delete</button>
      </div>
    )
  }
})

var NewContact = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  createContact(event) {
    event.preventDefault()
    ContactStore.addContact({
      first: this.refs.first.value,
      last: this.refs.last.value
    }, function (contact) {
      this.context.router.transitionTo('contact', { id: contact.id })
    }.bind(this))
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

var NotFound = React.createClass({
  render() {
    return <h2>Not found</h2>
  }
})

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Index} />
    <Route name='new' path='contact/new' handler={NewContact} />
    <Route name='contact' path='contact/:id' handler={Contact} />
    <NotFoundRoute handler={NotFound} />
  </Route>
)

Router.run(routes, (Handler) => {
  ReactDOM.render(<Handler/>, document.getElementById('example'))
})
