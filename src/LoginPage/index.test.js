/* @flow */
/* eslint-env jest */
/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import {
  each,
  keys,
  values,
  zipObject,
  map,
  last,
} from 'lodash'
import { LoginPage } from './index'

const updateLoginForm = jest.fn()
const requestLogin = jest.fn()

const SampleComponents = {
  freshStart: (
    <LoginPage
      isLoggedIn={false}
      isLoggingIn={false}
      userNameField="..."
      passwordField="123"
      updateLoginForm={updateLoginForm}
      requestLogin={requestLogin}
    />
  ),
  loggingIn: (
    <LoginPage
      isLoggedIn={false}
      isLoggingIn={true}
      userNameField="..."
      passwordField="123"
      updateLoginForm={updateLoginForm}
      requestLogin={requestLogin}
    />
  ),
  hasError: (
    <LoginPage
      isLoggingIn={false}
      isLoggedIn={false}
      error="Invalid user name"
      userNameField="..."
      passwordField="123"
      updateLoginForm={updateLoginForm}
      requestLogin={requestLogin}
    />
  ),
}

const SampleComponentsShallow = zipObject(keys(SampleComponents), map(values(SampleComponents), c => shallow(c)))
const SampleComponentsMounted = zipObject(keys(SampleComponents), map(values(SampleComponents), c => mount(c)))

describe('Components', () => {
  it('.login-header', () => {
    each(values(SampleComponentsShallow), (component) => {
      expect(component.find('.login-header')).to.have.length(1)
    })
  })

  it('.login-form', () => {
    each(values(SampleComponentsShallow), (component) => {
      expect(component.find('form.login-form')).to.have.length(1)
    })
  })

  it('.userNameField', () => {
    each(values(SampleComponentsShallow), (component) => {
      expect(component.find('.userNameField')).to.have.length(1)
    })
  })

  it('.passwordField', () => {
    each(values(SampleComponentsShallow), (component) => {
      expect(component.find('.passwordField')).to.have.length(1)
    })
  })

  it('.login-button', () => {
    each(values(SampleComponentsShallow), (component) => {
      expect(component.find('.login-button')).to.have.length(1)
    })
  })

  it('.login-error (if error is present)', () => {
    expect(SampleComponentsShallow.freshStart.find('.login-error')).to.have.length(0)
    expect(SampleComponentsShallow.hasError.find('.login-error')).to.have.length(1)
  })
})

describe('interactions', () => {
  it('dispatches LoginPage/UPDATE_LOGIN_FORM when changing userNameField', () => {
    const numCalls = updateLoginForm.mock.calls.length
    const userNameField = SampleComponentsMounted.freshStart.find('.userNameField > input').first()
    userNameField.simulate('change')
    expect(updateLoginForm.mock.calls.length).to.equal(numCalls + 1)
    expect(last(updateLoginForm.mock.calls)).to.eql(['userName', '...'])
  })

  it('does nothing when changing userNameField if isLoggingIn', () => {
    const numCalls = updateLoginForm.mock.calls.length
    const userNameField = SampleComponentsMounted.loggingIn.find('.userNameField > input').first()
    userNameField.simulate('change')
    expect(updateLoginForm.mock.calls.length).to.equal(numCalls)
  })

  it('does nothing when changing passwordField if isLoggingIn', () => {
    const numCalls = updateLoginForm.mock.calls.length
    const passwordField = SampleComponentsMounted.loggingIn.find('.passwordField > input').first()
    passwordField.simulate('change')
    expect(updateLoginForm.mock.calls.length).to.equal(numCalls)
  })

  it('dispatches LoginPage/UPDATE_LOGIN_FORM when changing passwordField', () => {
    const numCalls = updateLoginForm.mock.calls.length
    const userNameField = SampleComponentsMounted.freshStart.find('.passwordField > input').first()
    userNameField.simulate('change')
    expect(updateLoginForm.mock.calls.length).to.equal(numCalls + 1)
    expect(last(updateLoginForm.mock.calls)).to.eql(['password', '123'])
  })

  it('dispatches LoginPage/REQUEST_LOGIN when submitting form', () => {
    each([SampleComponentsMounted.hasError, SampleComponentsMounted.freshStart], (component) => {
      const numCalls = requestLogin.mock.calls.length
      const form = component.find('.login-form').first()
      form.simulate('submit')
      expect(requestLogin.mock.calls.length).to.equal(numCalls + 1)
      expect(last(requestLogin.mock.calls)).to.eql([])
    })
  })

  it('dispatches LoginPage/REQUEST_LOGIN when clicking button', () => {
    each([SampleComponentsMounted.hasError, SampleComponentsMounted.freshStart], (component) => {
      const numCalls = requestLogin.mock.calls.length
      const form = component.find('.login-form').first()
      form.simulate('submit')
      expect(requestLogin.mock.calls.length).to.equal(numCalls + 1)
      expect(last(requestLogin.mock.calls)).to.eql([])
    })
  })

  it('does not dispatch LoginPage/REQUEST_LOGIN while logging in', () => {
    const numCalls = requestLogin.mock.calls.length
    const form = SampleComponentsMounted.loggingIn.find('.login-form').first()
    const button = SampleComponentsMounted.loggingIn.find('.login-button').first()
    form.simulate('submit')
    button.simulate('click')
    expect(requestLogin.mock.calls.length).to.equal(numCalls)
  })
})
