import { createAction } from 'typesafe-actions'
import { IStateBaseMetadata } from '../types.gallery'
import { 
  IPackageStateListing, IPackageResponse, IPackageStateSelected, IPackageCreatePayload, IPackageUpdatePayload, IPackagePayloadUpdateCategories, IPackagePayloadUpdate 
} from './types.package'


export const GalleryPackageActions = {

  test_set_listing:         createAction('@gallery/PACKAGE__TEST_SETLISTING',           action => (payload: IPackageResponse[])          => action(payload)),
  test_set_selected:        createAction('@gallery/PACKAGE__TEST_SETSELECTED',          action => (payload: IPackageResponse)            => action(payload)),

  listAll_request:          createAction('@gallery/PACKAGE__LISTALL_REQUEST',           action => ()                                    => action({},      { do: 'gallery-package-get_list_all' })),
  listAll_success:          createAction('@gallery/PACKAGE__LISTALL_SUCCESS',           action => (payload: IPackageStateListing)       => action(payload, { do: 'gallery-package-get_list_all' })),
  listAll_failed:           createAction('@gallery/PACKAGE__LISTALL_FAILED',            action => (payload: IStateBaseMetadata)         => action(payload, { do: 'gallery-package-get_list_all' })),

  getFromId_request:        createAction('@gallery/PACKAGE__GETFROMID_REQUEST',         action => (payload: { id: string })             => action(payload, { do: 'gallery-package-get_from_id' })),
  getFromId_success:        createAction('@gallery/PACKAGE__GETFROMID_SUCCESS',         action => (payload: IPackageStateSelected)      => action(payload, { do: 'gallery-package-get_from_id' })),
  getFromId_failed:         createAction('@gallery/PACKAGE__GETFROMID_FAILED',          action => (payload: IStateBaseMetadata)         => action(payload, { do: 'gallery-package-get_from_id' })),

  createNew_request:        createAction('@gallery/PACKAGE__CREATENEW_REQUEST',         action => (payload: IPackageCreatePayload)      => action(payload, { do: 'gallery-package-create_new' })),
  createNew_success:        createAction('@gallery/PACKAGE__CREATENEW_SUCCESS',         action => (payload: IPackageStateSelected)      => action(payload, { do: 'gallery-package-create_new' })),
  createNew_failed:         createAction('@gallery/PACKAGE__CREATENEW_FAILED',          action => (payload: IStateBaseMetadata)         => action(payload, { do: 'gallery-package-create_new' })),

  update_request:           createAction('@gallery/PACKAGE__UPDATE_REQUEST',            action => (payload: IPackagePayloadUpdate)      => action(payload, { do: 'gallery-package-update' })),
  update_success:           createAction('@gallery/PACKAGE__UPDATE_SUCCESS',            action => (payload: IPackageStateSelected)      => action(payload, { do: 'gallery-package-update' })),
  update_failed:            createAction('@gallery/PACKAGE__UPDATE_FAILED',             action => (payload: IStateBaseMetadata)         => action(payload, { do: 'gallery-package-update' })),

  updateCategories_request: createAction('@gallery/PACKAGE__UPDATECATEGORIES_REQUEST',  action => (payload: IPackagePayloadUpdateCategories)     => action(payload, { do: 'gallery-package-update_categories' })),
  updateCategories_success: createAction('@gallery/PACKAGE__UPDATECATEGORIES_SUCCESS',  action => (payload: IPackageStateSelected)     => action(payload, { do: 'gallery-package-update_categories' })),
  updateCategories_failed:  createAction('@gallery/PACKAGE__UPDATECATEGORIES_FAILED',   action => (payload: IStateBaseMetadata)      => action(payload, { do: 'gallery-package-update_categories' })),
    
  delete_request:           createAction('@gallery/PACKAGE__DELETE_REQUEST',            action => (payload: { id: string })  => action(payload, { do: 'gallery-package-delete' })),
  delete_success:           createAction('@gallery/PACKAGE__DELETE_SUCCESS',            action => (payload: IPackageStateSelected)     => action(payload, { do: 'gallery-package-delete' })),
  delete_failed:            createAction('@gallery/PACKAGE__DELETE_FAILED',             action => (payload: IStateBaseMetadata)      => action(payload, { do: 'gallery-package-delete' })),
}   