/* @flow */
import type { SetFilter, RequestGetContacts, SuccessGetContacts, ErrorGetContacts } from './actionTypes'
import type { ContactDTO } from '../LeadscoreAPI'

export function setFilter (filter: string): SetFilter {
  return { type: 'ContactList/SET_FILTER', filter }
}

export function requestGetContacts (): RequestGetContacts {
  return { type: 'ContactList/REQUEST_GET_CONTACTS' }
}

export function successGetContacts (contacts: ContactDTO[]): SuccessGetContacts {
  return { type: 'ContactList/SUCCESS_GET_CONTACTS', contacts }
}

export function errorGetContacts (reason: string): ErrorGetContacts {
  return { type: 'ContactList/ERROR_GET_CONTACTS', reason }
}
