/* @flow */
import type { ContactDTO } from '../LeadscoreAPI'

export type SetFilter = { type: 'ContactList/SET_FILTER', filter: string }
export type RequestGetContacts = { type: 'ContactList/REQUEST_GET_CONTACTS' }
export type SuccessGetContacts = { type: 'ContactList/SUCCESS_GET_CONTACTS', contacts: ContactDTO[] }
export type ErrorGetContacts = { type: 'ContactList/ERROR_GET_CONTACTS', reason: string }

export type ContactListAction
  = SetFilter
  | RequestGetContacts
  | SuccessGetContacts
  | ErrorGetContacts
