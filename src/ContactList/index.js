/* @flow */
import React from 'react'
import Radium from 'radium'
import { Input, Loader, Button } from 'semantic-ui-react'
import {
  filter,
  map,
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
  getFilter,
  getError
} from './selectors'
import type { Action } from '../actionTypes'
import { requestLogout } from '../LoginPage/actions'
import { setFilter } from './actions'

type ContactListProps = {
  isDownloading: boolean,
  isDownloaded: boolean,
  contacts: ContactDTO[],
  filterString: string,
  error: string,
  dispatch: (Action) => void
}

function getPrimaryEmail (contact: ContactDTO): string {
  if (contact.emails == null) {
    return ''
  }
  const primary = find(contact.emails, e => e.type === 'PRIMARY')
  if (primary == null || primary.email == null) {
    return ''
  }
  return primary.email
}

function getPrimaryPhoneNumber (contact: ContactDTO): string {
  if (contact.phoneNumbers == null) {
    return ''
  }
  const primary = find(contact.phoneNumbers, e => e.type === 'PRIMARY')
  if (primary == null || primary.number == null) {
    return ''
  }
  return primary.number
}

const ContactsTable = ({ contacts }: { contacts: ContactDTO[] }) => (
  <table className='ui table'>
    <thead style={{ backgroundColor: '#ddd' }}>
      <tr>
        <td>Name</td>
        <td>Email</td>
        <td>Phone number</td>
      </tr>
    </thead>
    <tbody>
      {map(contacts, contact => (
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
      child = props.error ? (<p className='contactlist-error'>Error fetching contacts. Please try refreshing the page.</p>) : (<p>No contacts found ...</p>)
    }
  }
  return (
    <div className='contact-list-wrapper'>
      <Radium.Style rules={{ '.contactlist-error': { color: 'red' } }} />
      <div
        className='contact-list-search-bar'
        style={{
          padding: '24px 0px'
        }}
      >
        <Input
          value={props.filterString}
          onChange={(event) => props.dispatch(setFilter(event.target.value))}
          style={{ width: '400px' }}
          icon={{ name: 'search' }}
          placeholder='Filter contacts ...'
        />
        <Button style={{ float: 'right' }} onClick={() => props.dispatch(requestLogout())}>Log out</Button>
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
    filterString,
    error: getError(localState)
  }
}

export default connect(stateToProps)(Radium(ContactList))
