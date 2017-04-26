/* @flow */
import type { ApplicationState } from '../store'
import type { ContactDTO } from '../LeadscoreAPI'
import type { ContactListState } from './reducer'

export function getContactList (state: ApplicationState): ContactListState {
  return state.ContactList
}

export function isDownloading (state: ContactListState): boolean {
  return state.isDownloading
}

export function isDownloaded (state: ContactListState): boolean {
  return state.isDownloaded
}

export function getContacts (state: ContactListState): ContactDTO[] {
  return state.contacts
}

export function getFilter (state: ContactListState): string {
  return state.filter
}

export function getSortKey (state: ContactListState): string {
  return state.sortKey
}

export function getError (state: ContactListState): string {
  return state.error || ''
}
