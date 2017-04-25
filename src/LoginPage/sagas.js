/* @flow */
/* global Generator */
import {
  takeLatest,
  select,
  put,
  call
} from 'redux-saga/effects'
import moment from 'moment'
import {
  successLogin,
  errorLogin,
  successLogout
} from './actions'
import {
  getLoginState,
  getLoginForm,
  getUserToken,
  getUserTokenExpirationDate
} from './selectors'
import * as API from '../LeadscoreAPI'

export function * login (): Generator<any, any, any> {
  const selector = state => getLoginForm(getLoginState(state))
  const loginForm = yield select(selector)
  const { userName, password } = loginForm
  const apiResponse = yield call(API.login, userName, password)
  if (
    apiResponse.user &&
    apiResponse.user.id &&
    apiResponse.token &&
    apiResponse.token.authToken &&
    apiResponse.token.expires
  ) {
    let expirationDate = apiResponse.token.expires
    if (typeof expirationDate === 'string') {
      expirationDate = (new Date(expirationDate)).getTime()
    }
    yield put(successLogin(apiResponse.user.id, apiResponse.token.authToken, expirationDate))
  } else {
    yield put(errorLogin(apiResponse.message || 'unknown_error'))
  }
}

export function * logout (): Generator<any, any, any> {
  const tokenSelector = state => getLoginState(getUserToken(state))
  const authToken = yield select(tokenSelector)
  if (authToken == null) {
    yield put(successLogout())
    return
  }

  const expirationSelector = state => getLoginState(getUserTokenExpirationDate(state))
  const tokenExpires = yield select(expirationSelector)
  if (moment(tokenExpires).isBefore(moment())) {
    yield put(successLogout())
    return
  }

  yield call(API.logout, authToken)
  yield put(successLogout())
}

export default function * loginSagas (): Generator<any, any, any> {
  yield takeLatest('LoginPage/REQUEST_LOGIN', login)
  yield takeLatest('LoginPage/REQUEST_LOGOUT', logout)
}
