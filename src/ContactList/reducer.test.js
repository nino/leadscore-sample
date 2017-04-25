/* @flow */
/* eslint-env jest */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { omit, each } from 'lodash'
import { setFilter, requestGetContacts, successGetContacts, errorGetContacts } from './actions'
import reducer, { INITIAL_STATE, type ContactListState } from './reducer'

const sampleStates: ContactListState[] = [INITIAL_STATE]

describe('setFilter', () => {
  it('sets the filter to the given string', () => {
    each(sampleStates, state => {
      const newState = reducer(state, setFilter('abc'))
      expect(omit(newState, 'filter')).to.deep.eql(omit(state, 'filter'))
      expect(newState).to.have.property('filter', 'abc')
    })
  })
})

describe('requestGetContacts', () => {
  it('sets isDownloading=true', () => {
    each(sampleStates, state => {
      const newState = reducer(state, requestGetContacts())
      expect(omit(newState, 'isDownloading')).to.deep.eql(omit(state, 'isDownloading'))
      expect(newState).to.have.property('isDownloading', true)
    })
  })
})

describe('successGetContacts', () => {
  it('sets the contacts and isDownloading=false and isDownloaded=true', () => {
    each(sampleStates, state => {
      const sampleContacts = [{ id: 'abc' }, { id: 'def' }]
      const newState = reducer(state, successGetContacts(sampleContacts))
      expect(newState).to.deep.eql({
        ...state,
        isDownloading: false,
        isDownloaded: true,
        contacts: sampleContacts
      })
    })
  })
})

describe('errorGetContacts', () => {
  it('sets error to given string', () => {
    each(sampleStates, state => {
      const newState = reducer(state, errorGetContacts('some_error'))
      expect(newState).to.deep.eql({
        ...state,
        isDownloading: false,
        error: 'some_error'
      })
    })
  })
})
