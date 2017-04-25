/* @flow */
/* global Generator */
import loginSagas from './LoginPage/sagas'

export default function * rootSaga (): Generator<any, any, any> {
  yield * loginSagas()
}
