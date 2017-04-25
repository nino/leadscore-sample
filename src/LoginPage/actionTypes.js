/* @flow */
export type RequestLogin = { type: 'LoginPage/REQUEST_LOGIN' };
export type SuccessLogin = { type: 'LoginPage/SUCCESS_LOGIN', userId: string, userToken: string, userTokenExpirationDate: number };
export type ErrorLogin = { type: 'LoginPage/ERROR_LOGIN', reason: string };
export type UpdateLoginForm = { type: 'LoginPage/UPDATE_LOGIN_FORM', key: string, value: string };

export type LoginPageAction
  = RequestLogin
  | SuccessLogin
  | ErrorLogin
  | UpdateLoginForm
  ;
