/* @flow */
/* eslint-env jest */
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { BASE_URL } from './constants'
import { login } from './index'

chai.use(chaiAsPromised)
const expect = chai.expect
const mock = new MockAdapter(axios)

describe('login', () => {
  const successfulLoginResponseBody = {
    'user': {
      'id': 'usr_0vS7PddmmtbiXnqmW0RIns',
      'username': 'nino@ninoan.com',
      'accountStatus': 'TRIAL',
      'expirationDate': 1495617601482,
      'email': 'nino@ninoan.com',
      'firstName': 'Nino',
      'lastName': 'Annighöfer',
      'phoneNumber': '+4917632234934',
      'timeZone': 'Europe/Berlin',
      'organizationId': 'org_0vS7PdcGEQw7M69MBIrQp5',
      'organizationName': 'Nino',
      'signupClient': null,
      'dateCreated': 1493025602205,
      'active': true,
      'human': true,
      'permissions': [
        'USER',
        'USER_ADMIN'
      ],
      'teamIds': null
    },
    'integrations': {
      'sfdc': null,
      'salestools': null
    },
    'firebaseAuthToken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkIjp7InVpZCI6InVzcl8wdlM3UGRkbW10YmlYbnFtVzBSSW5zIn0sInYiOjAsImlhdCI6MTQ5MzExMTcxN30.WZmZdBqVGyJop8HBc5eErgxo1wO9jvKspCK0m9bH-xg',
    'token': {
      'expires': 1500887716,
      'authToken': 'kss_0vS8nd9KCGyicWt6UmqS5d'
    }
  }

  const loginFailureResponse = {
    'code': 401,
    'message': 'login.user.invalid_password'
  }

  it('returns a promise that resolves into a AuthenticationSuccessDTO', () => {
    mock.onPost(BASE_URL + 'login').replyOnce(200, successfulLoginResponseBody)
    return Promise.all([
      expect(login('nino', '123456')).to.eventually.have.property('user')
    ])
  })

  it('returns a promise that resolves into a AuthenticationFailure', () => {
    mock.onPost(BASE_URL + 'login').replyOnce(401, loginFailureResponse)
    return Promise.all([
      expect(login('nino', '123456')).to.eventually.have.property('message', 'login.user.invalid_password')
    ])
  })
})
