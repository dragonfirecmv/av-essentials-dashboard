import { call, put, takeEvery, select }   from 'redux-saga/effects'
import { getType }                from 'typesafe-actions'
import { IResponse, restRequest } from '~/core/libs/apis/rest.api'
import { API_GALLERY }            from '~/core/libs/constants/server-endpoints.const'
import { IGoodsResponse }      from '../types.goods'
import { GalleryGoodsActions } from '../actions.goods'
import { IAppState } from '~/core/redux/root-reducer'


export function *handleCreateNewGoods
  (action: ReturnType<typeof GalleryGoodsActions.createNew_request>) {

  try {
    const allState: IAppState = yield select()

    const response: IResponse<IGoodsResponse> =
      yield call(restRequest,
                 API_GALLERY.GOODS(''),
                 'POST',
                 action.payload,
                 { 'Authorization': `Bearer ${allState.auth.credentials.token_access}` })
    
    if (response.meta.ok) {

      yield put(GalleryGoodsActions.createNew_success({
        meta: {
          server_status: 'finished',
          server_action: action.meta.do,
          server_message: ''
        },
        goods_info: response?.payload
      }))
    }
    else {
      yield put(GalleryGoodsActions.createNew_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: response.meta.status_text 
      }))
    }
  }
  catch (ex) {
    if (ex instanceof Error) 
      yield put(GalleryGoodsActions.createNew_failed({ 
        server_status: 'error',
        server_action: action.meta.do, 
        server_message: ex.stack 
      }))

    else 
      yield put(GalleryGoodsActions.createNew_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: 'UNKNOWN' 
      }))
  }

}

export function *galleryGoodsCreateNewSaga() {
  yield takeEvery(getType(GalleryGoodsActions.createNew_request), handleCreateNewGoods)
}