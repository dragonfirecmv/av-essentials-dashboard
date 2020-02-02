import { createReducer } from 'typesafe-actions'
import { ToolsImageEditorActions as TA, ToolsImageEditorActionType } from './actions.image-editor'
import { IToolsImageEditorState, AspectRatio } from './types.image-editor'


export const toolsImageEditorInitState: IToolsImageEditorState = {
  raw_data: null,
  processed_data: null,
  aspect_ratio: AspectRatio.Square1by1
}

export const toolsImageEditorReducer = createReducer<IToolsImageEditorState, ToolsImageEditorActionType>(toolsImageEditorInitState)
  .handleAction(TA.new,          (state)              => ({ ...toolsImageEditorInitState }))
  .handleAction(TA.setRaw,       (state, { payload }) => ({ ...state, raw_data: payload }))
  .handleAction(TA.setProcessed, (state, { payload }) => ({ ...state, processed_data: payload }))