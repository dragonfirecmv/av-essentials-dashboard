import { createAction } from 'typesafe-actions'
import { IStateBaseMetadata } from '../gallery'
import { 
  IAuthState, 
  IAuthLoginPayload, 
  IAuthRegisterPayload 
} from './types.auth'


export const AuthActions = {

  loginUser_request:    createAction('@auth/LOGINUSER_REQUEST',    action => (payload: IAuthLoginPayload)    => action(payload, { do: 'auth-login' })),
  loginUser_success:    createAction('@auth/LOGINUSER_SUCCESS',    action => (payload: IAuthState)           => action(payload, { do: 'auth-login' })),
  loginUser_failed:     createAction('@auth/LOGINUSER_FAILED',     action => (payload: IStateBaseMetadata)   => {
    console.log({ errorType: 'auth-login', errorPayload: payload})
    return action(payload, { do: 'auth-login' })
  }),

  logoutUser:           createAction('@auth/LOGOUTUSER',           action => ()                              => action()),

  registerUser_request: createAction('@auth/REGISTERUSER_REQUEST', action => (payload: IAuthRegisterPayload) => action(payload, { do: 'auth-register' })),
  registerUser_success: createAction('@auth/REGISTERUSER_SUCCESS', action => (payload: IAuthState)           => action(payload, { do: 'auth-register' })),
  registerUser_failed:  createAction('@auth/REGISTERUSER_FAILED',  action => (payload: IStateBaseMetadata)   => {
    console.log({ errorType: 'auth-register', errorPayload: payload})
    return action(payload, { do: 'auth-register' })
  }),

}
