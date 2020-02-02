import { createReducer } from 'typesafe-actions'
import { IPackageState } from './types.package'
import { GalleryPackageActions as GPaA } from './actions.package'

export const galleryPackageInitState: IPackageState = {
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
  }
}

export const galleryPackageReducer = createReducer<IPackageState>(galleryPackageInitState)
  .handleAction(GPaA.test_set_listing,         (state, { payload }) => ({ ...state, listing: { ...galleryPackageInitState.listing, packages: payload } }))
  .handleAction(GPaA.test_set_selected,        (state, { payload }) => ({ ...state, selected: { ...galleryPackageInitState.selected, package: payload} }))

  .handleAction(GPaA.listAll_request,   (state, { meta })    => ({ ...state, listing: { meta: { server_status: 'loading', server_action: meta.do } } }))
  .handleAction(GPaA.listAll_failed,    (state, { payload }) => ({ ...state, listing: { meta: payload } }))
  .handleAction(GPaA.listAll_success,   (state, { payload }) => ({ ...state, listing: payload }))

  .handleAction(GPaA.getFromId_request, (state, { meta })    => ({ ...state, selected: { meta: { server_status: 'loading', server_action: meta.do } } }))
  .handleAction(GPaA.getFromId_failed,  (state, { payload }) => ({ ...state, selected: { meta: payload } }))
  .handleAction(GPaA.getFromId_success, (state, { payload }) => ({ ...state, selected: payload }))

  .handleAction(GPaA.createNew_request, (state, { meta })    => ({ ...state, selected: { meta: { server_status: 'loading', server_action: meta.do } } }))
  .handleAction(GPaA.createNew_failed,  (state, { payload }) => ({ ...state, selected: { meta: payload } }))
  .handleAction(GPaA.createNew_success, (state, { payload }) => ({ ...state, selected: payload }))

  .handleAction(GPaA.update_request,    (state, { meta })    => ({ ...state, selected: { meta: { server_status: 'loading', server_action: meta.do } } }))
  .handleAction(GPaA.update_failed,     (state, { payload }) => ({ ...state, selected: { meta: payload } }))
  .handleAction(GPaA.update_success,    (state, { payload }) => ({ ...state, selected: payload }))

  .handleAction(GPaA.updateCategories_request, (state, { meta })    => ({ ...state, selected: { meta: { server_status: 'loading', server_action: meta.do } } }))
  .handleAction(GPaA.updateCategories_failed,  (state, { payload }) => ({ ...state, selected: { meta: payload } }))
  .handleAction(GPaA.updateCategories_success, (state, { payload }) => ({ ...state, selected: payload }))

  .handleAction(GPaA.delete_request, (state, { meta })    => ({ ...state, selected: { meta: { server_status: 'loading', server_action: meta.do } } }))
  .handleAction(GPaA.delete_failed,  (state, { payload }) => ({ ...state, selected: { meta: payload } }))
  .handleAction(GPaA.delete_success, (state, { payload }) => ({ ...state, selected: payload }))