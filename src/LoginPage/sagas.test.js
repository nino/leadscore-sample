/* @flow */
/* eslint-env jest */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import moment from 'moment'
import {
  requestLogin,
  successLogin,
  errorLogin,
  successLogout
} from './actions'
import { login, logout } from './sagas'
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

    expect(generator.next()).to.have.property('done', true)
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

    expect(generator.next(), 'generator must be done').to.have.property('done', true)
  })
})

describe('logout', () => {
  it('calls the API and dispatches LoginPage/SUCESS_LOGOUT', () => {
    const generator = logout()
    let next = generator.next()

    expect(next, 'must select userToken from store')
      .to.have.deep.property('value.SELECT.selector').and.to.be.a('function')
    next = generator.next('user_token')

    expect(next, 'must select userTokenExpirationDate from store')
      .to.have.deep.property('value.SELECT.selector').and.to.be.a('function')
    next = generator.next(+moment().add(1, 'day'))

    expect(next, 'must call Leadscore API')
      .to.have.deep.property('value.CALL.fn', API.logout)
    expect(next).to.have.deep.property('value.CALL.args').and.to.eql(['user_token'])
    next = generator.next(true)

    expect(next, 'must put LoginPage/SUCCESS_LOGOUT')
      .to.have.deep.property('value.PUT.action').and.to.deep.eql(successLogout())

    expect(generator.next(), 'generator must be done').to.have.property('done', true)
  })

  it('just dispatches LoginPage/SUCCESS_LOGOUT if userToken not present', () => {
    const generator = logout()
    let next = generator.next()

    expect(next, 'must select userToken from store')
      .to.have.deep.property('value.SELECT.selector').and.to.be.a('function')
    next = generator.next(null)

    expect(next, 'must put LoginPage/SUCCESS_LOGOUT')
      .to.have.deep.property('value.PUT.action').and.to.eql(successLogout())

    expect(generator.next(), 'generator must be done').to.have.property('done', true)
  })

  it('just dispatches LoginPage/SUCCESS_LOGOUT if userToken is expired', () => {
    const generator = logout()
    let next = generator.next()

    expect(next, 'must select userToken from store')
      .to.have.deep.property('value.SELECT.selector').and.to.be.a('function')
    next = generator.next('user_taken')

    expect(next, 'must select userTokenExpirationDate from store')
      .to.have.deep.property('value.SELECT.selector').and.to.be.a('function')
    next = generator.next(+moment().subtract(1, 'day'))

    expect(next, 'must put LoginPage/SUCCESS_LOGOUT')
      .to.have.deep.property('value.PUT.action').and.to.eql(successLogout())

    expect(generator.next(), 'generator must be done').to.have.property('done', true)
  })
})
