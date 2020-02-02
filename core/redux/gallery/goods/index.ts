import { all, fork } from 'redux-saga/effects'
import { galleryGoodsListAllSaga } from './sagas/list-all.goods'
import { galleryGoodsGetFromIdSaga } from './sagas/get-from-id.goods'
import { galleryGoodsCreateNewSaga } from './sagas/create-new.goods'
import { galleryGoodsUpdateSaga } from './sagas/update.goods'
import { galleryGoodsDeleteSaga } from './sagas/delete.goods'

export * from './actions.goods'
export * from './reducer.goods'
export * from './types.goods'


export function *galleryGoodsRootSaga() {
  yield all([
    fork(galleryGoodsListAllSaga),
    fork(galleryGoodsGetFromIdSaga),
    fork(galleryGoodsCreateNewSaga),
    fork(galleryGoodsUpdateSaga),
    fork(galleryGoodsDeleteSaga)
  ])
}