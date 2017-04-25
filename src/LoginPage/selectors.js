/* @flow */
import type { ApplicationState } from '../store'
import type { LoginState } from './reducer'

export function getLoginState (state: ApplicationState): LoginState {
  return state.LoginPage
}

export function isLoggedIn (state: LoginState): boolean {
  return state.isLoggedIn
}

export function isLoggingIn (state: LoginState): boolean {
  return state.isLoggingIn
}

export function getError (state: LoginState): ?string {
  if (state.error != null) {
    return state.error
  }
}

export function getLoginForm (state: LoginState): {
  +userNameField: string, +passwordField: string
} {
  return state.loginForm
}

export function getUserNameField (state: LoginState): string {
  return getLoginForm(state).userNameField
}

export function getPasswordField (state: LoginState): string {
  return getLoginForm(state).userNameField
}
