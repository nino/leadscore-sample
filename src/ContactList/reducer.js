/* @flow */
import { omit } from 'lodash'
import type { ContactDTO } from '../LeadscoreAPI'
import type { Action } from '../actionTypes'

export type ContactListState = {
  isDownloading: boolean,
  isDownloaded: boolean,
  contacts: ContactDTO[],
  filter: string,
  sortKey: string,
  error?: string
}

export const INITIAL_STATE: ContactListState = {
  isDownloaded: false,
  isDownloading: false,
  filter: '',
  sortKey: 'name',
  contacts: []
}

export default function reducer (state: ContactListState = INITIAL_STATE, action: Action): ContactListState {
  if (action == null || action.type == null) {
    return state
  }
  switch (action.type) {
    case 'ContactList/SET_FILTER':
      return { ...state, filter: action.filter }
    case 'ContactList/REQUEST_GET_CONTACTS':
      return {
        ...state,
        isDownloading: true
      }
    case 'ContactList/SUCCESS_GET_CONTACTS':
      return {
        ...omit(state, 'error'),
        isDownloading: false,
        isDownloaded: true,
        contacts: action.contacts
      }
    case 'ContactList/ERROR_GET_CONTACTS':
      return {
        ...state,
        isDownloading: false,
        error: action.reason
      }
    default:
      return state
  }
}
