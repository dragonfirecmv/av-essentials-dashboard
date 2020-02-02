import { call, put, takeEvery }   from 'redux-saga/effects'
import { getType }                from 'typesafe-actions'
import { IResponse, restRequest } from '~/core/libs/apis/rest.api'
import { API_GALLERY }            from '~/core/libs/constants/server-endpoints.const'
import { GalleryPackageActions }  from '../actions.package'
import { IPackageResponse }       from '../types.package'


export function *handleGetFromIDPackage
  (action: ReturnType<typeof GalleryPackageActions.getFromId_request>) {

  try {
    const response: IResponse<IPackageResponse> =
      yield call(restRequest,
                 API_GALLERY.PACKAGES(action.payload.id),
                 'GET')
      
    if (response.meta.ok) {
      yield put(GalleryPackageActions.getFromId_success({
        meta: {
          server_status: 'finished',
          server_action: action.meta.do,
          server_message: ''
        },
        package: response?.payload
      }))
    }
    else {
      yield put(GalleryPackageActions.getFromId_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: response.meta.status_text 
      }))
    }
  }
  catch (ex) {
    if (ex instanceof Error) 
      yield put(GalleryPackageActions.getFromId_failed({ 
        server_status: 'error',
        server_action: action.meta.do, 
        server_message: ex.stack 
      }))

    else 
      yield put(GalleryPackageActions.listAll_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: 'UNKNOWN' 
      }))
  }

}

export function *galleryPackageGetFromIdSaga() {
  yield takeEvery(getType(GalleryPackageActions.getFromId_request), handleGetFromIDPackage)
}