/* @flow */
import type { LoginPageAction } from './LoginPage/actionTypes'
import type { ContactListAction } from './ContactList/actionTypes'

export type DefaultAction = { type: 'DEFAULT_ACTION' }

export type Action
  = DefaultAction
  | LoginPageAction
  | ContactListAction
