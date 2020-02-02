import { createAction } from 'typesafe-actions'
import { IStateBaseMetadata } from '../types.gallery'
import { 
  IGoodsStateListing, IGoodsGetFromIdPayload, IGoodsStateSelected, IGoodsResponse, IGoodsCreatePayload, IGoodsUpdatePayload 
} from './types.goods'


export const GalleryGoodsActions = {

  test_set_listing:     createAction('@gallery/GOODS__TEST_SETLISTING',        action => (payload: IGoodsResponse[])  => action(payload)),
  test_set_selected:    createAction('@gallery/GOODS__TEST_SETSELECTED',       action => (payload: IGoodsResponse)    => action(payload)),

  listAll_request:      createAction('@gallery/GOODS__LISTALL_REQUEST',        action => ()                                 => action({},      { do: 'gallery-goods-get_list_all' })),
  listAll_success:      createAction('@gallery/GOODS__LISTALL_SUCCESS',        action => (payload: IGoodsStateListing)      => action(payload, { do: 'gallery-goods-get_list_all' })),
  listAll_failed:       createAction('@gallery/GOODS__LISTALL_FAILED',         action => (payload: IStateBaseMetadata)      => action(payload, { do: 'gallery-goods-get_list_all' })),

  getFromId_request:    createAction('@gallery/GOODS__GETFROMSLUG_REQUEST',    action => (payload: IGoodsGetFromIdPayload)  => action(payload, { do: 'gallery-goods-get_from_slug' })),
  getFromId_success:    createAction('@gallery/GOODS__GETFROMSLUG_SUCCESS',    action => (payload: IGoodsStateSelected)     => action(payload, { do: 'gallery-goods-get_from_slug' })),
  getFromId_failed:     createAction('@gallery/GOODS__GETFROMSLUG_FAILED',     action => (payload: IStateBaseMetadata)      => action(payload, { do: 'gallery-goods-get_from_slug' })),

  createNew_request:    createAction('@gallery/GOODS__CREATENEW_REQUEST',      action => (payload: IGoodsCreatePayload)     => action(payload, { do: 'gallery-goods-create_new' })),
  createNew_success:    createAction('@gallery/GOODS__CREATENEW_SUCCESS',      action => (payload: IGoodsStateSelected)     => action(payload, { do: 'gallery-goods-create_new' })),
  createNew_failed:     createAction('@gallery/GOODS__CREATENEW_FAILED',       action => (payload: IStateBaseMetadata)      => action(payload, { do: 'gallery-goods-create_new' })),

  update_request:       createAction('@gallery/GOODS__UPDATE_REQUEST',         action => (payload: IGoodsUpdatePayload)     => action(payload, { do: 'gallery-goods-update' })),
  update_success:       createAction('@gallery/GOODS__UPDATE_SUCCESS',         action => (payload: IGoodsStateSelected)     => action(payload, { do: 'gallery-goods-update' })),
  update_failed:        createAction('@gallery/GOODS__UPDATE_FAILED',          action => (payload: IStateBaseMetadata)      => action(payload, { do: 'gallery-goods-update' })),
    
  delete_request:       createAction('@gallery/GOODS__DELETE_REQUEST',         action => (payload: IGoodsGetFromIdPayload)  => action(payload, { do: 'gallery-goods-delete' })),
  delete_success:       createAction('@gallery/GOODS__DELETE_SUCCESS',         action => (payload: IGoodsStateSelected)     => action(payload, { do: 'gallery-goods-delete' })),
  delete_failed:        createAction('@gallery/GOODS__DELETE_FAILED',          action => (payload: IStateBaseMetadata)      => action(payload, { do: 'gallery-goods-delete' })),
}