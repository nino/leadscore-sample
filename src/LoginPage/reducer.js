/* @flow */
import { omit } from 'lodash'
import type { Action } from '../actionTypes'
import { errorMessages } from './constants'

export type LoginState = {
  isLoggedIn: bool,
  isLoggingIn: bool,
  isLoggingOut?: bool,
  userName?: string,
  userId?: string,
  userToken?: string,
  userTokenExpirationDate?: number,
  error?: string,
  loginForm: {
    userNameField: string,
    passwordField: string,
  },
};

export const INITIAL_STATE: LoginState = {
  isLoggedIn: false,
  isLoggingIn: false,
  loginForm: {
    userNameField: '',
    passwordField: ''
  }
}

function englishifyError (message: string): string {
  return errorMessages[message] || 'An unknown error occurred'
}

export default function reducer (state: LoginState = INITIAL_STATE, action: Action): LoginState {
  if (action == null || action.type == null) {
    return state
  }
  switch (action.type) {
    case 'LoginPage/REQUEST_LOGIN':
      return {
        ...omit(state, 'error'),
        isLoggingIn: true,
        isLoggedIn: false
      }
    case 'LoginPage/SUCCESS_LOGIN':
      return {
        ...omit(state, 'error'),
        isLoggedIn: true,
        isLoggingIn: false,
        userId: action.userId,
        userToken: action.userToken,
        userTokenExpirationDate: action.userTokenExpirationDate
      }
    case 'LoginPage/ERROR_LOGIN':
      return {
        ...omit(state, ['userToken', 'userTokenExpirationDate', 'userId', 'userName']),
        isLoggedIn: false,
        isLoggingIn: false,
        error: englishifyError(action.reason)
      }
    case 'LoginPage/UPDATE_LOGIN_FORM':
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          passwordField: (action.key === 'password'
            ? action.value
            : state.loginForm.passwordField
          ),
          userNameField: (action.key === 'userName'
            ? action.value
            : state.loginForm.userNameField
          )
        }
      }
    case 'LoginPage/REQUEST_LOGOUT':
      return {
        ...state,
        isLoggingOut: true,
        isLoggingIn: false
      }
    case 'LoginPage/SUCCESS_LOGOUT':
      return INITIAL_STATE
    default:
      return state
  }
}
