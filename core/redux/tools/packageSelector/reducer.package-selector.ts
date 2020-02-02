import { createReducer } from 'typesafe-actions'
import { ToolsPackageSelectorActions as TA, ToolsPackageSelectorActionsType } from './actions.package-selector'
import { IToolsPackageSelectorState } from './types.package-selector'


export const toolsPackageSelectorInitState: IToolsPackageSelectorState = {
  selected_package: null
}

export const toolsPackageSelectorReducer = createReducer<IToolsPackageSelectorState, ToolsPackageSelectorActionsType>(toolsPackageSelectorInitState)
  .handleAction(TA.setSelected, (state, { payload }) => ({ ...state, selected_package: payload }))
  .handleAction(TA.new,         (state)              => ({ ...toolsPackageSelectorInitState }))