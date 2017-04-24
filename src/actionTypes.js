/* @flow */
import type { LoginPageAction } from './LoginPage/actionTypes';

export type DefaultAction = { type: 'DEFAULT_ACTION' };

export type Action
  = DefaultAction
  | LoginPageAction
  ;
