import { createReducer } from 'typesafe-actions'
import { combineReducers } from 'redux'
import { IToolsState } from './types.tools'
import { toolsImageEditorInitState, toolsImageEditorReducer } from './imageEditor'
import { toolsVendorSelectorInitState, toolsVendorSelectorReducer } from './vendorSelector'
import { toolsGoodsSelectorInitState, toolsGoodsSelectorReducer } from './goodsSelector'
import { toolsPackageSelectorInitState, toolsPackageSelectorReducer } from './packageSelector'


export const toolsInitState: IToolsState = {
  image_editor: toolsImageEditorInitState,
  vendor_selector: toolsVendorSelectorInitState,
  goods_selector: toolsGoodsSelectorInitState,
  package_selector: toolsPackageSelectorInitState
}

export const toolsRootReducer = combineReducers({
  image_editor: toolsImageEditorReducer,
  vendor_selector: toolsVendorSelectorReducer,
  goods_selector: toolsGoodsSelectorReducer,
  package_selector: toolsPackageSelectorReducer
})