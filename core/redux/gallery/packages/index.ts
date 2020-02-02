import { all, fork } from 'redux-saga/effects'
import { galleryPackageListAllSaga } from './sagas/list-all.packages'
import { galleryPackageCreateNewSaga } from './sagas/create-new.packages'
import { galleryPackageUpdateSaga } from './sagas/update.packages'
import { galleryPackageUpdateCategoriesSaga } from './sagas/update-categories.packages'
import { galleryPackageDeleteSaga } from './sagas/delete.packages'
import { galleryPackageGetFromIdSaga } from './sagas/get-from-id.packages'

export * from './actions.package'
export * from './types.package'
export * from './reducer.package'


export function *galleryPackageRootSaga() {
  yield all([
    fork(galleryPackageListAllSaga),
    fork(galleryPackageGetFromIdSaga),
    fork(galleryPackageCreateNewSaga),
    fork(galleryPackageUpdateSaga),
    fork(galleryPackageUpdateCategoriesSaga),
    fork(galleryPackageDeleteSaga),
  ])
}