import { all, fork } from 'redux-saga/effects'
import { authLoginUserSaga } from './sagas/login-user.auth'


export function *authRootSaga() {
  yield all([
    fork(authLoginUserSaga)
  ])
}
