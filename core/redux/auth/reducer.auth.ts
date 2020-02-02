import { createReducer } from 'typesafe-actions'
import { IAuthState } from './types.auth'
import { AuthActions as AA } from './actions.auth'


export const authInitialState: IAuthState = {
  meta: {
    server_status: "idle",
    server_action: 'none'
  },
  credentials: {
    is_logged_in: false
  }
}

export const authReducer = createReducer<IAuthState>(authInitialState)
  .handleAction(AA.loginUser_request,    (state, { meta })    => ({ ...state, meta: { server_status: 'loading', server_action: meta.do } }))
  .handleAction(AA.loginUser_failed,     (state, { payload }) => ({ ...authInitialState, meta: payload }))
  .handleAction(AA.loginUser_success,    (state, { payload }) => ({ ...state, ...payload }))

  .handleAction(AA.registerUser_request, (state, { meta })    => ({ ...state, meta: { server_status: 'loading', server_action: meta.do }}))
  .handleAction(AA.registerUser_failed,  (state, { payload }) => ({ ...authInitialState, meta: payload }))
  .handleAction(AA.registerUser_success, (state, { payload }) => ({ ...state, meta: payload}))

  .handleAction(AA.logoutUser,           ()                   => ({ ...authInitialState }))
  