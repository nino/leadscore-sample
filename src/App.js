/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import type { ApplicationState } from './store'
import { getLoginState, isLoggedIn } from './LoginPage/selectors'
import LoginPage from './LoginPage'

// temporary stand-in for the contact-list
const ContactList = () => (<div className='contact-list'>This is just for testing purposes</div>)

type AppProps = { isLoggedIn: boolean }

export const App = ({ isLoggedIn }: AppProps) => (
  <Router>
    <div className='app-wrapper'>
      <Route
        path='/'
        component={() => isLoggedIn ? (<Redirect to={{ pathname: '/contacts' }} />) : (<Redirect to={{ pathname: '/login' }} />)}
      />
      <Route
        path='/contacts'
        component={isLoggedIn ? ContactList : () => <Redirect to={{ pathname: '/login' }} />}
      />
      <Route path='/login' component={isLoggedIn ? () => <Redirect to={{ pathname: '/contacts' }} /> : LoginPage} />
    </div>
  </Router>
)

const stateToProps = (state: ApplicationState) => ({
  isLoggedIn: isLoggedIn(getLoginState(state))
})

export default connect(stateToProps)(App)
