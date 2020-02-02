import { createReducer } from 'typesafe-actions'
import { IVendorState } from './types.vendor'
import { GalleryVendorActions as GVA } from './actions.vendor'


export const galleryVendorInitState: IVendorState = {
  listing: {
    meta: {
      server_status: "idle",
      server_action: 'none'
    }
  },
  selected: {
    meta: {
      server_status: 'idle',
      server_action: 'none'
    }
  },
  edited: {
    meta: {
      server_status: 'idle',
      server_action: 'none'
    }
  }
}

export const galleryVendorReducer = createReducer<IVendorState>(galleryVendorInitState)
  .handleAction(GVA.reset_listing,            (state)              => ({ ...state, listing: galleryVendorInitState.listing }))
  .handleAction(GVA.reset_selected,           (state)              => ({ ...state, selected: galleryVendorInitState.selected }))

  .handleAction(GVA.test_set_listing,         (state, { payload }) => ({ ...state, listing: { ...galleryVendorInitState.listing, vendors: payload } }))
  .handleAction(GVA.test_set_selected,        (state, { payload }) => ({ ...state, selected: { ...galleryVendorInitState.selected, vendor: payload} }))

  .handleAction(GVA.listAll_request,          (state, { meta })    => ({ ...state, listing: { meta: { server_status: 'loading', server_action: meta.do } } }))
  .handleAction(GVA.listAll_failed,           (state, { payload }) => ({ ...state, listing: { meta: payload } }))
  .handleAction(GVA.listAll_success,          (state, { payload }) => ({ ...state, listing: payload }))

  .handleAction(GVA.getFromSlug_request,      (state, { meta })    => ({ ...state, selected: { meta: { server_status: 'loading', server_action: meta.do } }}))
  .handleAction(GVA.getFromSlug_failed,       (state, { payload }) => ({ ...state, selected: { meta: payload } }))
  .handleAction(GVA.getFromSlug_success,      (state, { payload }) => ({ ...state, selected: payload }))

  .handleAction(GVA.createNew_request,        (state, { meta })    => ({ ...state, selected: { meta: { server_status: 'loading', server_action: meta.do } }}))
  .handleAction(GVA.createNew_failed,         (state, { payload }) => ({ ...state, selected: { meta: payload } }))
  .handleAction(GVA.createNew_success,        (state, { payload }) => ({ ...state, selected: payload }))
  .handleAction(GVA.getFromSlug_success,      (state, { payload }) => ({ ...state, selected: payload }))

  .handleAction(GVA.update_request,           (state, { meta })    => ({ ...state, selected: { meta: { server_status: 'loading', server_action: meta.do } }}))
  .handleAction(GVA.update_failed,            (state, { payload }) => ({ ...state, selected: { meta: payload } }))
  .handleAction(GVA.update_success,           (state, { payload }) => ({ ...state, selected: payload }))

  .handleAction(GVA.updateCategories_request, (state, { meta })    => ({ ...state, selected: { meta: { server_status: 'loading', server_action: meta.do } }}))
  .handleAction(GVA.updateCategories_failed,  (state, { payload }) => ({ ...state, selected: { meta: payload } }))
  .handleAction(GVA.updateCategories_success, (state, { payload }) => ({ ...state, selected: payload }))

  .handleAction(GVA.delete_request,           (state, { meta })    => ({ ...state, selected: { meta: { server_status: 'loading', server_action: meta.do } }}))
  .handleAction(GVA.delete_failed,            (state, { payload }) => ({ ...state, selected: { meta: payload } }))
  .handleAction(GVA.delete_success,           (state, { payload }) => ({ ...state, selected: payload }))