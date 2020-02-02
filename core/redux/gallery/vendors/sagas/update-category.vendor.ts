import { call, put, takeEvery, select } from 'redux-saga/effects'
import { getType }                      from 'typesafe-actions'
import { GalleryVendorActions }         from '../actions.vendor'
import { IResponse, restRequest }       from '~/core/libs/apis/rest.api'
import { IVendorResponse }              from '../types.vendor'
import { API_GALLERY }                  from '~/core/libs/constants/server-endpoints.const'
import { IAppState }                    from '~/core/redux/root-reducer'


export function *handleCategoryUpdateFromSlugVendor(action: ReturnType<typeof GalleryVendorActions.updateCategories_request>) {
  try {
    const allState: IAppState = yield select()

    console.log({ xxx: action.payload.payload_category })

    const response: IResponse<IVendorResponse> = 
      yield call(restRequest,
                 API_GALLERY.VENDOR_BYSLUG_UPDATECATEGORY(action.payload.vendor_slug), 
                 'PUT',
                 { vendor_categories: action.payload.payload_category },
                 { 'Authorization': `Bearer ${allState.auth.credentials.token_access}` })

    if (response.meta.ok) 
      yield put(GalleryVendorActions.updateCategories_success({
        meta: {
          server_status: 'finished',
          server_action: action.meta.do,
          server_message: ''
        }
      }))
    
    else 
      yield put(GalleryVendorActions.updateCategories_failed({ 
        server_status: 'error', 
        server_action: action.meta.do, 
        server_message: response.meta.status_text 
      }))
    
  }
  catch (ex) {
    if (ex instanceof Error) 
      yield put(GalleryVendorActions.updateCategories_failed({ 
        server_status: 'error', 
        server_action: action.meta.do, 
        server_message: ex.stack }))

    else 
      yield put(GalleryVendorActions.updateCategories_failed({ 
        server_status: 'error', 
        server_action: action.meta.do, 
        server_message: 'UNKNOWN' }))
  }

}

export function *galleryVendorCategoryUpdateFromSlug() {
  yield takeEvery(getType(GalleryVendorActions.updateCategories_request), handleCategoryUpdateFromSlugVendor)
}