/* @flow */
import type {
  RequestLogin,
  SuccessLogin,
  ErrorLogin,
  UpdateLoginForm,
  RequestLogout,
  SuccessLogout
} from './actionTypes'

export function requestLogin (): RequestLogin {
  return { type: 'LoginPage/REQUEST_LOGIN' }
}

export function successLogin (userId: string, userToken: string, userTokenExpirationDate: number): SuccessLogin {
  return { type: 'LoginPage/SUCCESS_LOGIN', userId, userToken, userTokenExpirationDate }
}

export function errorLogin (reason: string): ErrorLogin {
  return { type: 'LoginPage/ERROR_LOGIN', reason }
}

export function updateLoginForm (key: string, value: string): UpdateLoginForm {
  return { type: 'LoginPage/UPDATE_LOGIN_FORM', key, value }
}

export function requestLogout (): RequestLogout {
  return { type: 'LoginPage/REQUEST_LOGOUT' }
}

export function successLogout (): SuccessLogout {
  return { type: 'LoginPage/SUCCESS_LOGOUT' }
}
