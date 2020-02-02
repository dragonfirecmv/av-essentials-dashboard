import { createAction, ActionType } from 'typesafe-actions'
import { IStateBaseMetadata } from '../types.gallery'
import {
  IVendorStateListing,
  IVendorStateSelected,
  IVendorGetFromSlugPayload,
  IVendorCreatePayload,
  IVendorUpdatePayload,
  IVendorUpdateCategoriesPayload,
  IVendorResponse,
  IVendorPayloadUpdateBySlug,
  IVendorPayloadUpdateCategory
} from './types.vendor'


export const GalleryVendorActions = {
  reset_listing:          createAction('@gallery/VENDOR__RESETLISTING',           action => ()                                    => action()),
  reset_selected:         createAction('@gallery/VENDOR__RESETSELECTED',          action => ()                                    => action()),

  test_set_listing:       createAction('@gallery/VENDOR__TEST_SETLISTING',        action => (payload: IVendorResponse[])          => action(payload)),
  test_set_selected:      createAction('@gallery/VENDOR__TEST_SETSELECTED',       action => (payload: IVendorResponse)            => action(payload)),
  
  listAll_request:          createAction('@gallery/VENDOR__LISTALL_REQUEST',          action => ()                                        => action({},      { do: 'gallery-vendor-get_list_all' })),
  listAll_success:          createAction('@gallery/VENDOR__LISTALL_SUCCESS',          action => (payload: IVendorStateListing)            => action(payload, { do: 'gallery-vendor-get_list_all' })),
  listAll_failed:           createAction('@gallery/VENDOR__LISTALL_FAILED',           action => (payload: IStateBaseMetadata)             => action(payload, { do: 'gallery-vendor-get_list_all' })),
    
  getFromSlug_request:      createAction('@gallery/VENDOR__GETFROMSLUG_REQUEST',      action => (payload: IVendorGetFromSlugPayload)      => action(payload, { do: 'gallery-vendor-get_from_slug' })),
  getFromSlug_success:      createAction('@gallery/VENDOR__GETFROMSLUG_SUCCESS',      action => (payload: IVendorStateSelected)           => action(payload, { do: 'gallery-vendor-get_from_slug' })),
  getFromSlug_failed:       createAction('@gallery/VENDOR__GETFROMSLUG_FAILED',       action => (payload: IStateBaseMetadata)             => action(payload, { do: 'gallery-vendor-get_from_slug' })),
    
  createNew_request:        createAction('@gallery/VENDOR__CREATENEW_REQUEST',        action => (payload: IVendorCreatePayload)           => action(payload, { do: 'gallery-vendor-create_new' })),
  createNew_success:        createAction('@gallery/VENDOR__CREATENEW_SUCCESS',        action => (payload: IVendorStateSelected)           => action(payload, { do: 'gallery-vendor-create_new' })),
  createNew_failed:         createAction('@gallery/VENDOR__CREATENEW_FAILED',         action => (payload: IStateBaseMetadata)             => action(payload, { do: 'gallery-vendor-create_new' })),
    
  update_request:           createAction('@gallery/VENDOR__UPDATE_REQUEST',           action => (payload: IVendorPayloadUpdateBySlug)     => action(payload, { do: 'gallery-vendor-update' })),
  update_success:           createAction('@gallery/VENDOR__UPDATE_SUCCESS',           action => (payload: IVendorStateSelected)           => action(payload, { do: 'gallery-vendor-update' })),
  update_failed:            createAction('@gallery/VENDOR__UPDATE_FAILED',            action => (payload: IStateBaseMetadata)             => action(payload, { do: 'gallery-vendor-update' })),

  updateCategories_request: createAction('@gallery/VENDOR__UPDATECATEGORIES_REQUEST', action => (payload: IVendorPayloadUpdateCategory)   => action(payload, { do: 'gallery-vendor-update_categories' })),
  updateCategories_success: createAction('@gallery/VENDOR__UPDATECATEGORIES_SUCCESS', action => (payload: IVendorStateSelected)           => action(payload, { do: 'gallery-vendor-update_categories' })),
  updateCategories_failed:  createAction('@gallery/VENDOR__UPDATECATEGORIES_FAILED',  action => (payload: IStateBaseMetadata)             => action(payload, { do: 'gallery-vendor-update_categories' })),
    
  delete_request:           createAction('@gallery/VENDOR__DELETE_REQUEST',           action => (payload: IVendorGetFromSlugPayload)      => action(payload, { do: 'gallery-vendor-delete' })),
  delete_success:           createAction('@gallery/VENDOR__DELETE_SUCCESS',           action => (payload: IVendorStateSelected)           => action(payload, { do: 'gallery-vendor-delete' })),
  delete_failed:            createAction('@gallery/VENDOR__DELETE_FAILED',            action => (payload: IStateBaseMetadata)             => action(payload, { do: 'gallery-vendor-delete' })),
}

export type GalleryVendorActionType = ActionType<typeof GalleryVendorActions>