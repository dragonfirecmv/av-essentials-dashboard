import { all, fork } from 'redux-saga/effects'
import { galleryVendorListAllSaga } from './sagas/list-all.vendor'
import { galleryVendorGetFromSlugSaga } from './sagas/get-from-slug.vendor'
import { galleryVendorCreateNewSaga } from './sagas/create-new.vendor'
import { galleryVendorDeleteFromSlug } from './sagas/delete-from-slug.vendor'
import { galleryVendorUpdateFromSlug } from './sagas/update.vendor'
import { galleryVendorCategoryUpdateFromSlug } from './sagas/update-category.vendor'

export * from './actions.vendor'
export * from './types.vendor'
export * from './reducer.vendor'


export function *galleryVendorRootSaga() {
  yield all([
    fork(galleryVendorListAllSaga),
    fork(galleryVendorGetFromSlugSaga),
    fork(galleryVendorCreateNewSaga),
    fork(galleryVendorDeleteFromSlug),
    fork(galleryVendorUpdateFromSlug),
    fork(galleryVendorCategoryUpdateFromSlug)
  ])
}