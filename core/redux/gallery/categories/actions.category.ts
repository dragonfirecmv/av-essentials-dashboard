import { createAction, ActionType } from 'typesafe-actions'
import { ICategoryStateListing } from './types.category'
import { IStateBaseMetadata } from '../types.gallery'


export const GalleryCategoryActions = {
  listAll_request: createAction('@gallery/CATEGORY__LISTALL_REQUEST', action => ()                                => action({},      { do: 'gallery-category-get_list_all' })),
  listAll_success: createAction('@gallery/CATEGORY__LISTALL_SUCCESS', action => (payload: ICategoryStateListing)  => action(payload, { do: 'gallery-category-get_list_all' })),
  listAll_failed:  createAction('@gallery/CATEGORY__LISTALL_ERROR',  action => (payload: IStateBaseMetadata)      => action(payload, { do: 'gallery-category-get_list_all' })),
}

export type GalleryCategoryActionsType = ActionType<typeof GalleryCategoryActions>