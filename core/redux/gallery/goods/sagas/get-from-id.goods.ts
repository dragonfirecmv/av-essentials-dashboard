import { call, put, takeEvery }   from 'redux-saga/effects'
import { getType }                from 'typesafe-actions'
import { IResponse, restRequest } from '~/core/libs/apis/rest.api'
import { API_GALLERY }            from '~/core/libs/constants/server-endpoints.const'
import { IGoodsResponse }      from '../types.goods'
import { GalleryGoodsActions } from '../actions.goods'


export function *handleGetFromIdGoods
  (action: ReturnType<typeof GalleryGoodsActions.getFromId_request>) {

  try {
    const response: IResponse<IGoodsResponse> =
      yield call(restRequest,
                 API_GALLERY.GOODS(action.payload.id),
                 'GET')
    
    if (response.meta.ok) {

      yield put(GalleryGoodsActions.getFromId_success({
        meta: {
          server_status: 'finished',
          server_action: action.meta.do,
          server_message: ''
        },
        goods_info: response?.payload
      }))
    }
    else {
      yield put(GalleryGoodsActions.getFromId_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: response.meta.status_text 
      }))
    }
  }
  catch (ex) {
    if (ex instanceof Error) 
      yield put(GalleryGoodsActions.getFromId_failed({ 
        server_status: 'error',
        server_action: action.meta.do, 
        server_message: ex.stack 
      }))

    else 
      yield put(GalleryGoodsActions.getFromId_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: 'UNKNOWN' 
      }))
  }

}

export function *galleryGoodsGetFromIdSaga() {
  yield takeEvery(getType(GalleryGoodsActions.getFromId_request), handleGetFromIdGoods)
}