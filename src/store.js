import { combineReducers } from 'redux';
import LoginPage, { type LoginState } from './LoginPage/reducer';

export type ApplicationState = {
  LoginPage: LoginState,
};

export default combineReducers({
  LoginPage,
});
