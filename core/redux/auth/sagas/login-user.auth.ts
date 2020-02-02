import { call, put, takeEvery }   from 'redux-saga/effects'
import { getType }                from 'typesafe-actions'
import { IResponse, restRequest } from '~/core/libs/apis/rest.api'
import { API_AUTH }               from '~/core/libs/constants/server-endpoints.const'
import { AuthActions }            from '../actions.auth'
import { IAuthLoginResponse }     from '../types.auth'


export function* handleLoginUser(action: ReturnType<typeof AuthActions.loginUser_request>) {

  try {
    const response: IResponse<IAuthLoginResponse> = 
      yield call(restRequest, 
                 API_AUTH.USER_LOGIN(), 
                 'POST', 
                 action.payload)

    if (response.meta.ok) {
      //@ts-ignore
      const { id, email, givenname, token, admin } = response.payload

      if (!admin)
        yield put(AuthActions.loginUser_failed({
          server_status: 'error',
          server_action: action.meta.do,
          server_message: "NOT_ADMIN" 
        }))

      else {
        yield put(AuthActions.loginUser_success({
          meta: {
            server_status: "finished",
            server_action: action.meta.do,
            server_message: ''
          },
          credentials: {
            is_logged_in: true,
            token_access: token
          },
          user_info: {
            id, email, givenname
          }
        }))
      }
      
    } else {
      yield put(AuthActions.loginUser_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: response.meta.status_text 
      }))
      yield put(AuthActions.logoutUser())
    }
  }
  catch (ex) {

    if (ex instanceof Error) 
      yield put(AuthActions.loginUser_failed({ 
        server_status: 'error',
        server_action: action.meta.do, 
        server_message: ex.stack 
      }))

    else 
      yield put(AuthActions.loginUser_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: 'UNKNOWN' 
      }))
    
  }

}

export function *authLoginUserSaga() {
  yield takeEvery(getType(AuthActions.loginUser_request), handleLoginUser)
}