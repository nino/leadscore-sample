/* @flow */
/* eslint-env jest */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import {
  requestLogin,
  successLogin,
  errorLogin
} from './actions'
import { login } from './sagas'
import * as API from '../LeadscoreAPI'

describe('login', () => {
  it('calls the API and dispatches LoginPage/SUCCESS_LOGIN', () => {
    const generator = login(requestLogin())
    let next = generator.next()

    expect(next, 'must SELECT login form')
      .to.have.deep.property('value.SELECT.selector').and.be.a('function')
    next = generator.next({ userName: 'person', password: '1234' })

    expect(next, 'must CALL API.login')
      .to.have.deep.property('value.CALL.fn').and.to.eql(API.login)
    expect(next).to.have.deep.property('value.CALL.args')
      .and.to.eql(['person', '1234'])
    next = generator.next({
      user: { username: 'person', id: 'user_id' },
      token: {
        authToken: 'token!',
        expires: 567
      }
    })

    expect(next, 'must PUT LoginPage/SUCCESS_LOGIN')
      .to.have.deep.property('value.PUT.action')
      .and.to.eql(successLogin('user_id', 'token!', 567))
  })

  it('calls the API and dispatches LoginPage/ERROR_LOGIN upon failure', () => {
    const generator = login(requestLogin())
    let next = generator.next()

    expect(next, 'must SELECT login form')
      .to.have.deep.property('value.SELECT.selector').and.to.be.a('function')
    next = generator.next({ userName: 'person', password: '1234' })

    expect(next, 'must CALL API.login')
      .to.have.deep.property('value.CALL.fn').and.to.eql(API.login)
    expect(next).to.have.deep.property('value.CALL.args')
      .and.to.eql(['person', '1234'])
    next = generator.next({ code: 401, message: 'returned_error' })

    expect(next, 'must PUT LoginPage/ERROR_LOGIN')
      .to.have.deep.property('value.PUT.action')
      .and.to.eql(errorLogin('returned_error'))
  })
})
