import { call, put, takeEvery, select } from 'redux-saga/effects'
import { getType }                      from 'typesafe-actions'
import { GalleryVendorActions }         from '../actions.vendor'
import { IResponse, restRequest }       from '~/core/libs/apis/rest.api'
import { IVendorResponse }              from '../types.vendor'
import { API_GALLERY }                  from '~/core/libs/constants/server-endpoints.const'
import { IAppState }                    from '~/core/redux/root-reducer'


export function *handleCreateNewVendor(action: ReturnType<typeof GalleryVendorActions.createNew_request>) {
  try {
    const allState: IAppState = yield select()

    const response: IResponse<IVendorResponse> = 
      yield call(restRequest,
                 API_GALLERY.VENDOR(), 
                 'POST',
                 action.payload,
                 { 'Authorization': `Bearer ${allState.auth.credentials.token_access}` })

    if (response.meta.ok) 
      yield put(GalleryVendorActions.createNew_success({
        meta: {
          server_status: 'finished',
          server_action: action.meta.do,
          server_message: ''
        },
        vendor: response?.payload 
      }))
    
    else 
      yield put(GalleryVendorActions.createNew_failed({ 
        server_status: 'error', 
        server_action: action.meta.do, 
        server_message: response.meta.status_text 
      }))
    
  }
  catch (ex) {
    if (ex instanceof Error) 
      yield put(GalleryVendorActions.createNew_failed({ 
        server_status: 'error', 
        server_action: action.meta.do, 
        server_message: ex.stack }))

    else 
      yield put(GalleryVendorActions.createNew_failed({ 
        server_status: 'error', 
        server_action: action.meta.do, 
        server_message: 'UNKNOWN' }))
  }

}

export function *galleryVendorCreateNewSaga() {
  yield takeEvery(getType(GalleryVendorActions.createNew_request), handleCreateNewVendor)
}