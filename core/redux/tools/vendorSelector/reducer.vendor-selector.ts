import { createReducer } from 'typesafe-actions'
import { ToolsVendorSelectorActions as TA, ToolsVendorSelectorActionsType } from './actions.vendor-selector'
import { IToolsVendorSelectorState } from './types.vendor-selector'


export const toolsVendorSelectorInitState: IToolsVendorSelectorState = {
  selected_vendor: null
}

export const toolsVendorSelectorReducer = createReducer<IToolsVendorSelectorState, ToolsVendorSelectorActionsType>(toolsVendorSelectorInitState)
  .handleAction(TA.setSelected, (state, { payload }) => ({ ...state, selected_vendor: payload }))
  .handleAction(TA.new,         (state)              => ({ ...toolsVendorSelectorInitState }))