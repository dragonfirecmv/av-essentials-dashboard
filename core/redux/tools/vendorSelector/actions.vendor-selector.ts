import { createAction, ActionType, action } from 'typesafe-actions'
import { IVendorResponse } from '../../gallery/vendors'


export const ToolsVendorSelectorActions = {
  setSelected: createAction('@tools/VENDORSELECTOR_SETSELECTED', action => (vendor: IVendorResponse) => action(vendor)),
  new:         createAction('@tools/VENDORSELECTOR_NEW',         action => ()                        => action()),
}

export type ToolsVendorSelectorActionsType = ActionType<typeof ToolsVendorSelectorActions>