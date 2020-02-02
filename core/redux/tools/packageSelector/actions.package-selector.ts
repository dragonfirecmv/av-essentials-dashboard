import { createAction, ActionType, action } from 'typesafe-actions'
import { IPackageResponse } from '../../gallery/packages'


export const ToolsPackageSelectorActions = {
  setSelected: createAction('@tools/PACKAGESELECTOR_SETSELECTED', action => (vendor: IPackageResponse) => action(vendor)),
  new:         createAction('@tools/PACKAGESELECTOR_NEW',         action => ()                        => action()),
}

export type ToolsPackageSelectorActionsType = ActionType<typeof ToolsPackageSelectorActions>