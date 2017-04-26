/* @flow */
import axios from 'axios'
import { BASE_URL } from './constants'

export type UserDTO = {
  +id?: number,
  +username?: string,
  +accountStatus?: 'TRIAL' | 'ACTIVE' | 'SUSPENDED' | 'CANCELED',
  +expirationDate?: string,
  +email?: string,
  +firstName?: string,
  +lastName?: string,
  +phoneNumber?: string,
  +timeZone?: string,
  +organizationId?: string,
  +organizationName?: string,
  +signupClient?: string,
  +dateCreated?: string,
  +active?: boolean,
  +human?: boolean,
  +permissions?: string[],
  +teamIds?: string[]
}

export type AuthenticationTokenDTO = {
  +expires?: string | number, // TODO the schema says this is a string, but the samples say it's a number. Which is it?
  +authToken?: string
}

export type AuthenticationSuccessDTO = {
  +user?: UserDTO,
  +integrations?: Object,
  +firebaseAuthToken?: string,
  +token?: AuthenticationTokenDTO
}

export type APIFailureResponse = {
  +code?: number,
  +message?: string
}

export function login (username: string, password: string): Promise<AuthenticationSuccessDTO|APIFailureResponse> {
  return axios.post(BASE_URL + 'login', { username, password })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      }
    })
    .catch((err) => {
      const message = (err.response && err.response.data && err.response.data.message) || 'unknown_error'
      const code = (err.response && err.response.status) || -1
      return { code, message }
    })
}

export function logout (authToken: string): Promise<boolean> {
  return axios.post(BASE_URL + 'logout', { authToken })
    .then((response) => response.status === 201)
    .catch(() => false)
}

export type EmailContactBasicInfo = {
  +primary?: boolean,
  +type?: string,
  +email?: string,
  +status?: 'OK' | 'BOUNCED' | 'VERIFIED'
}

export type AddressDTO = {
  +fullAddress?: string
}

export type ContactDTO = {
  +contactType?: 'PERSON' | 'COMPANY',
  +companyName?: string,
  +addresses?: AddressDTO[],
  +id: string,
  +firstName?: string,
  +lastName?: string,
  +emails?: EmailContactBasicInfo[]
}

export type PagedContactsDTO = {
  +data?: ContactDTO[],
  +limit?: number,
  +offset?: number,
  +count?: number
}

export function getContacts (authToken: string): Promise<PagedContactsDTO|APIFailureResponse> {
  console.log(authToken)
  return axios.get(BASE_URL + 'contacts', { headers: { authToken } })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        const message = (response.data && response.data.message) || 'unknown_error'
        return { code: response.status, message: message }
      }
    })
    .catch(() => ({ code: -1, message: 'request_failed' }))
}
