import { fork, all } from "redux-saga/effects";
import { authRootSaga } from "./auth/saga.auth";
import { galleryRootSaga } from "./gallery";


export function *rootSaga() {
  yield all([
    fork(authRootSaga),
    fork(galleryRootSaga)
  ])
}