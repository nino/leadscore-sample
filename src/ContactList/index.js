/* @flow */
import React from 'react'
import { Input, Loader } from 'semantic-ui-react'
import {
  filter,
  each,
  find,
  some,
  includes,
  values
} from 'lodash'
import { connect } from 'react-redux'
import type { ApplicationState } from '../store'
import type { ContactDTO } from '../LeadscoreAPI'
import {
  isDownloading,
  isDownloaded,
  getContacts,
  getContactList,
  getFilter
} from './selectors'
import type { Action } from '../actionTypes'
import { setFilter } from './actions'

type ContactListProps = {
  isDownloading: boolean,
  isDownloaded: boolean,
  contacts: ContactDTO[],
  filterString: string,
  dispatch: (Action) => void
}

function getPrimaryEmail (contact: ContactDTO): string {
  if (contact.emails == null) {
    return ''
  }
  const primary = find(contact.emails, e => e.primary)
  if (primary == null || primary.email == null) {
    return ''
  }
  return primary.email
}

function getPrimaryPhoneNumber (contact: ContactDTO): string {
  if (contact.phoneNumbers == null) {
    return ''
  }
  const primary = find(contact.phoneNumbers, e => e.primary)
  if (primary == null || primary.number == null) {
    return ''
  }
  return primary.number
}

const ContactsTable = ({ contacts }: { contacts: ContactDTO[] }) => (
  <table>
    <thead>
      <tr>
        <td>Name</td>
        <td>Email</td>
        <td>Phone number</td>
      </tr>
    </thead>
    <tbody>
      {each(contacts, contact => (
        <tr key={contact.id}>
          <td>{contact.contactType === 'PERSON' ? (contact.firstName || '') + ' ' + (contact.lastName || '') : (contact.companyName || '')}</td>
          <td>{getPrimaryEmail(contact)}</td>
          <td>{getPrimaryPhoneNumber(contact)}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export const ContactList = (props: ContactListProps) => {
  let child = null
  if (!props.isDownloaded && props.isDownloading) {
    child = (<Loader />)
  } else {
    if (props.contacts.length > 0) {
      child = (<ContactsTable contacts={props.contacts} />)
    } else {
      child = (<p>You do not have any contacts yet. Create some at <a href='https://leadscore.io'>leadscore.io</a> and come back later.</p>)
    }
  }
  return (
    <div className='contact-list-wrapper'>
      <div className='contact-list-search-bar'>
        <Input value={props.filterString} onChange={(event) => props.dispatch(setFilter(event.target.value))} />
      </div>
      <div className='contact-list'>
        {child}
      </div>
    </div>
  )
}

const stateToProps = (state: ApplicationState) => {
  const localState = getContactList(state)
  const filterString = getFilter(localState)
  const contactsAll = getContacts(localState)
  const contactFilter = contact => some(values(contact), field => includes(field, filterString))
  const contactsFiltered = filter(contactsAll, contactFilter)
  return {
    isDownloading: isDownloading(localState),
    isDownloaded: isDownloaded(localState),
    contacts: contactsFiltered,
    filterString
  }
}

export default connect(stateToProps)(ContactList)
