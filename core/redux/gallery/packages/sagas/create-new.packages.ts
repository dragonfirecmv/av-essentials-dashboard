import { call, put, takeEvery, select }   from 'redux-saga/effects'
import { getType }                        from 'typesafe-actions'
import { IResponse, restRequest }         from '~/core/libs/apis/rest.api'
import { API_GALLERY }                    from '~/core/libs/constants/server-endpoints.const'
import { GalleryPackageActions }          from '../actions.package'
import { IPackageResponse }               from '../types.package'
import { IAppState }                      from '~/core/redux/root-reducer'


export function *handleCreateNewPackage
  (action: ReturnType<typeof GalleryPackageActions.createNew_request>) {

  try {
    const allState: IAppState = yield select()

    const response: IResponse<IPackageResponse> =
      yield call(restRequest,
                 API_GALLERY.PACKAGES(''),
                 'POST',
                 action.payload,
                 { 'Authorization': `Bearer ${allState.auth.credentials.token_access}` })
      
    if (response.meta.ok) {
      yield put(GalleryPackageActions.createNew_success({
        meta: {
          server_status: 'finished',
          server_action: action.meta.do,
          server_message: ''
        },
        package: response.payload
      }))
    }
    else {
      yield put(GalleryPackageActions.createNew_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: response.meta.status_text 
      }))
    }
  }
  catch (ex) {
    if (ex instanceof Error) 
      yield put(GalleryPackageActions.createNew_failed({ 
        server_status: 'error',
        server_action: action.meta.do, 
        server_message: ex.stack 
      }))

    else 
      yield put(GalleryPackageActions.createNew_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: 'UNKNOWN' 
      }))
  }

}

export function *galleryPackageCreateNewSaga() {
  yield takeEvery(getType(GalleryPackageActions.createNew_request), handleCreateNewPackage)
}