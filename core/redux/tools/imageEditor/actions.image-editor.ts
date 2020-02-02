import { createAction, ActionType, action } from 'typesafe-actions'
import { AspectRatio } from './types.image-editor'


export const ToolsImageEditorActions = {
  new:            createAction('@tools/IMAGEEDITOR_NEW',            action => ()                   => action()),
  setRaw:         createAction('@tools/IMAGEEDITOR_SETRAW',         action => (base64: string)     => action(base64)),
  setProcessed:   createAction('@tools/IMAGEEDITOR_SETPROCESSED',   action => (base64: string)     => action(base64)),
  setAspectRatio: createAction('@tools/IMAGEEDITOR_SETASPECTRATIO', action => (ratio: AspectRatio) => action(ratio)),
}

export type ToolsImageEditorActionType = ActionType<typeof ToolsImageEditorActions>