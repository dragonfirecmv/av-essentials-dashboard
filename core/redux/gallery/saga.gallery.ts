import { all, fork } from 'redux-saga/effects'
import { galleryCategoryRootSaga } from './categories'
import { galleryVendorRootSaga } from './vendors'
import { galleryPackageRootSaga } from './packages'
import { galleryGoodsRootSaga } from './goods'


export function *galleryRootSaga() {
  yield all([
    fork(galleryCategoryRootSaga),
    fork(galleryVendorRootSaga),
    fork(galleryPackageRootSaga),
    fork(galleryGoodsRootSaga)
  ])
}