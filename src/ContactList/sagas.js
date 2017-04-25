/* @flow */
/* global Generator */
import { takeLatest, select, put, call } from 'redux-saga/effects'
import moment from 'moment'
import { getLoginState, getUserToken, getUserTokenExpirationDate } from '../LoginPage/selectors'
import { requestGetContacts, successGetContacts, errorGetContacts } from './actions'
import * as API from '../LeadscoreAPI'

export function * getContacts (): Generator<any, any, any> {
  yield put(requestGetContacts())
  const tokenSelector = state => getUserToken(getLoginState(state))
  const expirySelector = state => getUserTokenExpirationDate(getLoginState(state))
  const token = yield select(tokenSelector)
  if (!token) {
    yield put(errorGetContacts('not_logged_in'))
    return
  }
  const expires = yield select(expirySelector)
  if (moment(expires * 1000).isBefore(moment())) {
    yield put(errorGetContacts('token_expired'))
    return
  }
  const apiResponse = yield call(API.getContacts, token)
  if (apiResponse.data == null) {
    yield put(errorGetContacts('bad_response'))
    return
  }
  yield put(successGetContacts(apiResponse.data))
}

export default function * rootSaga (): Generator<any, any, any> {
  yield takeLatest('LoginPage/SUCCESS_LOGIN', getContacts)
}
