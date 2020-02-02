import { createReducer } from 'typesafe-actions'
import { IGoodsState } from './types.goods'
import { GalleryGoodsActions as GGA } from './actions.goods'


export const galleryGoodsInitState: IGoodsState = {
  listing: {
    meta: {
      server_status: "idle",
      server_action: "none"
    }
  },
  selected: {
    meta: {
      server_status: "idle",
      server_action: "none"
    }
  }
}

export const galleryGoodsReducer = createReducer<IGoodsState>(galleryGoodsInitState)
  .handleAction(GGA.test_set_listing,  (state, { payload }) => ({ ...state, listing: { ...galleryGoodsInitState.listing, goods_list: payload } }))
  .handleAction(GGA.test_set_selected, (state, { payload }) => ({ ...state, selected: { ...galleryGoodsInitState.selected, goods_info: payload} }))

  .handleAction(GGA.listAll_request,   (state, { meta })    => ({ ...state, listing: { meta: { server_status: 'loading', server_action: meta.do } } }))
  .handleAction(GGA.listAll_failed,    (state, { payload }) => ({ ...state, listing: { meta: payload } }))
  .handleAction(GGA.listAll_success,   (state, { payload }) => ({ ...state, listing: payload }))
  
  .handleAction(GGA.getFromId_request, (state, { meta })    => ({ ...state, selected: { meta: { server_status: 'loading', server_action: meta.do } }}))
  .handleAction(GGA.getFromId_failed,  (state, { payload }) => ({ ...state, selected: { meta: payload } }))
  .handleAction(GGA.getFromId_success, (state, { payload }) => ({ ...state, selected: payload }))
  
  .handleAction(GGA.createNew_request, (state, { meta })    => ({ ...state, selected: { meta: { server_status: 'loading', server_action: meta.do } }}))
  .handleAction(GGA.createNew_failed,  (state, { payload }) => ({ ...state, selected: { meta: payload } }))
  .handleAction(GGA.createNew_success, (state, { payload }) => ({ ...state, selected: payload }))
  
  .handleAction(GGA.update_request, (state, { meta })    => ({ ...state, selected: { meta: { server_status: 'loading', server_action: meta.do } }}))
  .handleAction(GGA.update_failed,  (state, { payload }) => ({ ...state, selected: { meta: payload } }))
  .handleAction(GGA.update_success, (state, { payload }) => ({ ...state, selected: payload }))
  
  .handleAction(GGA.delete_request, (state, { meta })    => ({ ...state, selected: { meta: { server_status: 'loading', server_action: meta.do } }}))
  .handleAction(GGA.delete_failed,  (state, { payload }) => ({ ...state, selected: { meta: payload } }))
  .handleAction(GGA.delete_success, (state, { payload }) => ({ ...state, selected: payload }))