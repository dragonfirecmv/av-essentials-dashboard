import { createReducer } from 'typesafe-actions'
import { ToolsGoodsSelectorActions as TA, ToolsGoodsSelectorActionsType } from './actions.goods-selector'
import { IToolsGoodsSelectorState } from './types.goods-selector'


export const toolsGoodsSelectorInitState: IToolsGoodsSelectorState = {
  selected_goods: null
}

export const toolsGoodsSelectorReducer = createReducer<IToolsGoodsSelectorState, ToolsGoodsSelectorActionsType>(toolsGoodsSelectorInitState)
  .handleAction(TA.goodsSelector_setSelected, (state, { payload }) => ({ ...state, selected_goods: payload }))
  .handleAction(TA.goodsSelector_new,         (state)              => ({ ...toolsGoodsSelectorInitState }))