import { createReducer } from 'typesafe-actions'
import { SysActions as SA } from './actions.sys'
import { ISysState } from './types.sys'


export const sysInitialState: ISysState = {
  locale: 'en',
  modal: {
    show: 'none'
  },
  toast: {
    timeout_in_ms: 3000
  },
  status: {
    app_status: "normal",
    network_connection: "connected"
  },
  theme: {
    skin: 'light'
  }, 
  process_info: {
    show: 'none',
    process_msg: ''
  }
}

export const sysReducer = createReducer<ISysState>(sysInitialState)
  .handleAction(SA.modal_open,  (state, { payload }) => ({ ...state, modal: { show: payload } }))
  .handleAction(SA.modal_close, (state, { payload }) => ({ ...state, modal: { show: 'none' } }))

  .handleAction(SA.process_info,  (state, { payload }) => ({ ...state, process_info: { show: 'processing', process_msg: payload } }))
  .handleAction(SA.process_error, (state, { payload }) => ({ ...state, process_info: { show: 'error', process_msg: payload } }))
  .handleAction(SA.process_close, (state, { payload }) => ({ ...state, process_info: { show: 'none', process_msg: '' } }))