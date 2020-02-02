import { combineReducers }                   from 'redux'
import { IAuthState, authReducer }           from './auth'
import { IGalleryState, galleryRootReducer } from './gallery'
import { ISysState, sysReducer }             from './sys'
import { IToolsState, toolsRootReducer }         from './tools';


export interface IAppState {
  auth: IAuthState
  gallery: IGalleryState
  tools: IToolsState,
  sys: ISysState
}

export const rootReducer = combineReducers({
  auth: authReducer,
  gallery: galleryRootReducer,
  tools: toolsRootReducer,
  sys: sysReducer
})