import { IStateBaseMetadata } from '../gallery';


// Interface :: Payload and Response object.

export interface IAuthLoginPayload {
  email: string,
  password: string
}

export interface IAuthRegisterPayload {
  givenname: string
  email: string
  password1: string
  password2: string
}

export interface IAuthLoginResponse {
  id: string
  email: string
  givenname: string
  token: string,
  admin: boolean,
  verified: boolean,
  staff: boolean
}


// Interface :: States

export interface IAuthState {
  meta: IStateBaseMetadata
  credentials: IAuthStateCredentials
  user_info?: IAuthStateUserInformation
  
}

export interface IAuthStateCredentials {
  is_logged_in: boolean
  token_access?: string
  token_refresh?: string
}

export interface IAuthStateUserInformation {
  id?: string
  email?: string
  givenname?: string
  profile?: IAuthStateUserProfile
}

export interface IAuthStateUserProfile {
  about_me?: string
  location?: string
  website?: string
}
