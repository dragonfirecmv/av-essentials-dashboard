import { call, put, takeEvery }   from 'redux-saga/effects'
import { getType }                from 'typesafe-actions'
import { IResponse, restRequest } from '~/core/libs/apis/rest.api'
import { API_GALLERY }            from '~/core/libs/constants/server-endpoints.const'
import { ICategoryResponse }      from '../types.category'
import { GalleryCategoryActions } from '../actions.category'


export function *handleListAllCategory
  (action: ReturnType<typeof GalleryCategoryActions.listAll_request>) {

  try {
    const response: IResponse<ICategoryResponse[]> =
      yield call(restRequest,
                 API_GALLERY.CATEGORIES(),
                 'GET')
      
    if (response.meta.ok) {
      const processedPayload =
        response?.payload?.filter(category => category.slug === 'adavendor-categories')

      yield put(GalleryCategoryActions.listAll_success({
        meta: {
          server_status: 'finished',
          server_action: action.meta.do,
          server_message: ''
        },
        categories: processedPayload[0]?.children
      }))
    }
    else {
      yield put(GalleryCategoryActions.listAll_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: response.meta.status_text 
      }))
    }
  }
  catch (ex) {
    if (ex instanceof Error) 
      yield put(GalleryCategoryActions.listAll_failed({ 
        server_status: 'error',
        server_action: action.meta.do, 
        server_message: ex.stack 
      }))

    else 
      yield put(GalleryCategoryActions.listAll_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: 'UNKNOWN' 
      }))
  }

}

export function *galleryCategoryListAllSaga() {
  yield takeEvery(getType(GalleryCategoryActions.listAll_request), handleListAllCategory)
}