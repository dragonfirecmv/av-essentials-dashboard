import { createAction, ActionType, action } from 'typesafe-actions'
import { IGoodsResponse } from '../../gallery/goods'


export const ToolsGoodsSelectorActions = {
  goodsSelector_setSelected: createAction('@tools/GOODSSELECTOR_SETSELECTED', action => (vendor: IGoodsResponse) => action(vendor)),
  goodsSelector_new:         createAction('@tools/GOODSSELECTOR_NEW',         action => ()                        => action()),
}

export type ToolsGoodsSelectorActionsType = ActionType<typeof ToolsGoodsSelectorActions>