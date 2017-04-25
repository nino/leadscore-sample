import { combineReducers } from 'redux'
import LoginPage, { type LoginState } from './LoginPage/reducer'
import ContactList, { type ContactListState } from './ContactList/reducer'

export type ApplicationState = {
  LoginPage: LoginState,
  ContactList: ContactListState
};

export default combineReducers({
  LoginPage,
  ContactList
})
