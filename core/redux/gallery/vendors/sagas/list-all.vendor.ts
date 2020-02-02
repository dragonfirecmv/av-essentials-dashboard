import { call, put, takeEvery }   from 'redux-saga/effects'
import { getType }                from 'typesafe-actions'
import { GalleryVendorActions }   from '../actions.vendor'
import { IResponse, restRequest } from '~/core/libs/apis/rest.api'
import { IVendorResponse }        from '../types.vendor'
import { API_GALLERY }            from '~/core/libs/constants/server-endpoints.const'


export function *handleListAllVendor(action: ReturnType<typeof GalleryVendorActions.listAll_request>) {

  try {
    const response: IResponse<IVendorResponse[]> = 
      yield call(restRequest, 
                 API_GALLERY.VENDOR(), 
                 'GET')

    if (response.meta.ok)
      yield put(GalleryVendorActions.listAll_success({
        meta: {
          server_status: 'finished',
          server_action: action.meta.do,
          server_message: ''
        },
        vendors: response?.payload
      }))
    
    else 
      yield put(GalleryVendorActions.listAll_failed({ 
        server_status: 'error', 
        server_action: action.meta.do, 
        server_message: response.meta.status_text }))
    
  }
  catch (ex) {
    if (ex instanceof Error) 
      yield put(GalleryVendorActions.listAll_failed({ 
        server_status: 'error', 
        server_action: action.meta.do, 
        server_message: ex.stack }))

    else 
      yield put(GalleryVendorActions.listAll_failed({ 
        server_status: 'error', 
        server_action: action.meta.do, 
        server_message: ex.stack }))
    
  }

}

export function *galleryVendorListAllSaga() {
  yield takeEvery(getType(GalleryVendorActions.listAll_request), handleListAllVendor)
}