/* @flow */
/* global Generator */
import loginSagas from './LoginPage/sagas'
import contactListSagas from './ContactList/sagas'

export default function * rootSaga (): Generator<any, any, any> {
  yield * loginSagas()
  yield * contactListSagas()
}
