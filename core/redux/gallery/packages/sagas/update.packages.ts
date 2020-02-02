import { call, put, takeEvery, select }   from 'redux-saga/effects'
import { getType }                        from 'typesafe-actions'
import { IResponse, restRequest }         from '~/core/libs/apis/rest.api'
import { API_GALLERY }                    from '~/core/libs/constants/server-endpoints.const'
import { GalleryPackageActions }          from '../actions.package'
import { IPackageResponse }               from '../types.package'
import { IAppState }                      from '~/core/redux/root-reducer'


export function *handleUpdatePackage
  (action: ReturnType<typeof GalleryPackageActions.update_request>) {

  try {
    const allState: IAppState = yield select()

    const response: IResponse<IPackageResponse> =
      yield call(restRequest,
                 API_GALLERY.PACKAGES(action.payload.id),
                 'PUT',
                 action.payload.update_payload,
                 { 'Authorization': `Bearer ${allState.auth.credentials.token_access}` })
      
    if (response.meta.ok) {
      yield put(GalleryPackageActions.update_success({
        meta: {
          server_status: 'finished',
          server_action: action.meta.do,
          server_message: ''
        },
        package: response.payload
      }))
    }
    else {
      yield put(GalleryPackageActions.update_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: response.meta.status_text 
      }))
    }
  }
  catch (ex) {
    if (ex instanceof Error) 
      yield put(GalleryPackageActions.update_failed({ 
        server_status: 'error',
        server_action: action.meta.do, 
        server_message: ex.stack 
      }))

    else 
      yield put(GalleryPackageActions.update_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: 'UNKNOWN' 
      }))
  }

}

export function *galleryPackageUpdateSaga() {
  yield takeEvery(getType(GalleryPackageActions.update_request), handleUpdatePackage)
}