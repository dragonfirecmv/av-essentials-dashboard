import { call, put, takeEvery }   from 'redux-saga/effects'
import { getType }                from 'typesafe-actions'
import { IResponse, restRequest } from '~/core/libs/apis/rest.api'
import { API_GALLERY }            from '~/core/libs/constants/server-endpoints.const'
import { GalleryPackageActions }  from '../actions.package'
import { IPackageResponse }       from '../types.package'


export function *handleListAllPackages
  (action: ReturnType<typeof GalleryPackageActions.listAll_request>) {

  try {
    const response: IResponse<IPackageResponse[]> =
      yield call(restRequest,
                 API_GALLERY.PACKAGES(''),
                 'GET')
      
    if (response.meta.ok) {
      yield put(GalleryPackageActions.listAll_success({
        meta: {
          server_status: 'finished',
          server_action: action.meta.do,
          server_message: ''
        },
        packages: response?.payload
      }))
    }
    else {
      yield put(GalleryPackageActions.listAll_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: response.meta.status_text 
      }))
    }
  }
  catch (ex) {
    if (ex instanceof Error) 
      yield put(GalleryPackageActions.listAll_failed({ 
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

export function *galleryPackageListAllSaga() {
  yield takeEvery(getType(GalleryPackageActions.listAll_request), handleListAllPackages)
}