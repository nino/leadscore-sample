/* @flow */
/* eslint-env jest */
/* eslint-disable no-unused-expressions */
import React from 'react'
import { Loader } from 'semantic-ui-react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { ContactList } from './index'

const sampleContact = {
  id: 'contact1',
  firstName: 'Joan',
  lastName: 'Doe',
  phoneNumbers: [
    { primary: true, number: '+441231212' }
  ]
}

const dispatch = jest.fn()

const componentLoadedNoContacts = shallow(
  <ContactList
    contacts={[]}
    isDownloaded
    isDownloading={false}
    filterString=''
    sortKey='name'
    dispatch={dispatch}
  />
)

const componentLoadedWithContacts = shallow(
  <ContactList
    isDownloading={false}
    isDownloaded
    contacts={[sampleContact]}
    filterString=''
    sortKey='name'
    dispatch={dispatch}
  />
)

const componentLoading = shallow(
  <ContactList
    isDownloaded={false}
    isDownloading
    contacts={[]}
    filterString=''
    sortKey='name'
    dispatch={dispatch}
  />
)

describe('Components', () => {
  it('.contact-list-search-bar', () => {
    expect(componentLoadedNoContacts.find('.contact-list-search-bar')).to.have.length(1)
  })

  it('.contact-list', () => {
    expect(componentLoadedNoContacts.find('.contact-list')).to.have.length(1)
  })

  it('.contact-list > table (if contacts are loaded and at least 1 exists)', () => {
    expect(componentLoadedNoContacts.find('.contact-list > ContactsTable')).to.have.length(0)
    expect(componentLoading.find('.contact-list > table')).to.have.length(0)
    expect(componentLoadedWithContacts.find('.contact-list > ContactsTable')).to.have.length(1)
  })

  it('Loader (if contacts not loaded)', () => {
    expect(componentLoading.find(Loader)).to.have.length(1)
    expect(componentLoadedWithContacts.find(Loader)).to.have.length(0)
  })

  it('Message saying that no contacts exist)', () => {
    expect(componentLoadedNoContacts.text()).to.include('any contacts')
  })
})
