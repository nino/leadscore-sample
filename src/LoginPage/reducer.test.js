/* @flow */
/* eslint-env jest */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import {
  omit,
  keys,
  each,
  first
} from 'lodash'
import reducer, { INITIAL_STATE, type LoginState } from './reducer'
import { defaultAction } from '../actions'
import {
  requestLogin,
  successLogin,
  errorLogin,
  updateLoginForm,
  requestLogout,
  successLogout
} from './actions'
import { errorMessages } from './constants'

const SampleStateLoggingIn: LoginState = {
  ...INITIAL_STATE,
  isLoggingIn: true
}

const SampleStateLoggedIn: LoginState = {
  ...INITIAL_STATE,
  isLoggedIn: true,
  userToken: 'token_abc',
  userTokenExpirationDate: 123
}

const SampleStates: LoginState[] = [
  INITIAL_STATE,
  SampleStateLoggingIn,
  SampleStateLoggedIn
]

describe('DefaultAction', () => {
  it('it returns the default state', () => {
    const state = INITIAL_STATE
    const action = defaultAction()
    const newState = reducer(state, action)
    expect(newState).to.deep.eql(state)
  })
})

describe('requestLogin', () => {
  it('sets isLoggingIn to true, isLoggedIn to false, and removes error', () => {
    each(SampleStates, state => {
      const newState = reducer(state, requestLogin())
      expect(newState).to.have.property('isLoggingIn', true)
      expect(newState).to.have.property('isLoggedIn', false)
      expect(newState).to.not.have.property('error')
      expect(omit(newState, ['isLoggingIn', 'isLoggedIn'])).to.eql(omit(state, ['isLoggingIn', 'isLoggedIn']))
    })
  })
})

describe('successLogin', () => {
  const userId = 'usr_abc'
  const userToken = 'kss_abc'
  const userTokenExpirationDate = 1500822938
  const action = successLogin(userId, userToken, userTokenExpirationDate)
  const newState = reducer(SampleStateLoggingIn, action)

  it('sets the userId, userName, userToken, and userTokenExpirationDate to the provided values', () => {
    expect(newState).to.have.property('userId', userId)
    expect(newState).to.have.property('userToken', userToken)
    expect(newState).to.have.property('userTokenExpirationDate', userTokenExpirationDate)
  })

  it('sets isLoggingIn to false and isLoggedIn to true', () => {
    expect(newState).to.have.property('isLoggingIn', false)
    expect(newState).to.have.property('isLoggedIn', true)
  })
})

describe('errorLogin', () => {
  it('sets the error field depending on the provided message', () => {
    each(keys(errorMessages), errorKey => {
      const action = errorLogin(errorKey)
      const newState = reducer(SampleStateLoggingIn, action)
      expect(newState).to.have.property('error', errorMessages[errorKey])
      expect(newState).to.have.property('isLoggedIn', false)
      expect(newState).to.have.property('isLoggingIn', false)
    })
  })

  it('removes userId, userName, userToken(+expiration date)', () => {
    const state = { ...SampleStateLoggingIn, userId: 'sample-id', userName: 'Jon' }
    const action = errorLogin(first(keys(errorMessages)))
    const newState = reducer(state, action)
    expect(newState).to.not.have.property('userTokenExpirationDate')
    expect(newState).to.not.have.property('userToken')
    expect(newState).to.not.have.property('userName')
    expect(newState).to.not.have.property('userId')
  })
})

describe('updateLoginForm', () => {
  each(SampleStates, (state) => {
    it('updates the userNameField', () => {
      const newState = reducer(state, updateLoginForm('userName', 'Sally'))
      expect(omit(newState, 'loginForm.userNameField')).to.deep.eql(omit(state, 'loginForm.userNameField'))
      expect(newState).to.have.deep.property('loginForm.userNameField', 'Sally')
    })

    it('updates the passwordField', () => {
      const newState = reducer(state, updateLoginForm('password', '1234'))
      expect(omit(newState, 'loginForm.passwordField')).to.deep.eql(omit(state, 'loginForm.passwordField'))
      expect(newState).to.have.deep.property('loginForm.passwordField', '1234')
    })
  })
})

describe('requestLogout', () => {
  it('sets isLoggingOut=true and isLoggingIn=false', () => {
    each(SampleStates, state => {
      const newState = reducer(state, requestLogout())
      const changingFields = ['isLoggingIn', 'isLoggingOut']
      expect(omit(newState, changingFields)).to.eql(omit(state, changingFields))
      expect(newState).to.have.property('isLoggingIn', false)
      expect(newState).to.have.property('isLoggingOut', true)
    })
  })
})

describe('successLogout', () => {
  it('resets state to INITIAL_STATE', () => {
    each(SampleStates, state => {
      const newState = reducer(state, successLogout())
      expect(newState).to.deep.eql(INITIAL_STATE)
    })
  })
})
