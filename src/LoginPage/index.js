/* @flow */
import React from 'react'
import { Input, Button } from 'semantic-ui-react'
import type { ApplicationState } from '../store'
import type { Action } from '../actionTypes'
import { requestLogin, updateLoginForm } from './actions'
import {
  getLoginState,
  isLoggingIn,
  getError,
  getUserNameField,
  getPasswordField,
} from './selectors'

import { connect } from 'react-redux'

type LoginPageProps = {
  userNameField: string,
  passwordField: string,
  isLoggingIn: boolean,
  error?: string,
  requestLogin: () => void,
  updateLoginForm: (k: string, v: string) => void,
}

export const LoginPage = ({
  userNameField,
  passwordField,
  isLoggingIn,
  error = '',
  requestLogin,
  updateLoginForm,
}: LoginPageProps) => {
  function handleSubmit (event: SyntheticEvent): void {
    event.preventDefault()
    if (!isLoggingIn) {
      requestLogin()
    }
  }

  return (
    <div className='login-page'>
      <div className='login-header'>
      </div>
      <form className='login-form' onSubmit={handleSubmit}>
        {error ? <div className='login-error'>{error}</div> : <div />}
        <label htmlFor='userNameField'>
          <Input
            disabled={isLoggingIn}
            className='userNameField'
            name='userNameField'
            value={userNameField}
            onChange={(event: SyntheticInputEvent) => isLoggingIn || updateLoginForm('userName', event.target.value)}
          />
        </label>
        <label htmlFor='passwordField'>
          <Input
            disabled={isLoggingIn}
            className='passwordField'
            name='passwordField'
            value={passwordField}
            onChange={(event: SyntheticInputEvent) => isLoggingIn || updateLoginForm('password', event.target.value)}
          />
        </label>
        <Button
          className='login-button'
          disabled={isLoggingIn}
        >
          Log in
        </Button>
      </form>
    </div>
    )}

const stateToProps = (state: ApplicationState) => {
  const loginState = getLoginState(state)
  return {
    userNameField: getUserNameField(loginState),
    passwordField: getPasswordField(loginState),
    isLoggingIn: isLoggingIn(loginState),
    error: getError(loginState),
  }
}

const dispatchToProps = (dispatch: (Action) => void) => ({
  requestLogin: () => dispatch(requestLogin()),
  updateLoginForm: (k, v) => dispatch(updateLoginForm(k, v)),
})

export default connect(stateToProps, dispatchToProps)(LoginPage)
