import { all, fork } from 'redux-saga/effects'
import { galleryCategoryListAllSaga } from './sagas/list-all.category'

export * from './actions.category'
export * from './redux.category'
export * from './types.category'


export function *galleryCategoryRootSaga() {
  yield all([
    fork(galleryCategoryListAllSaga)
  ])
}