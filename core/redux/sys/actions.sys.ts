import { createAction, action } from 'typesafe-actions'
import { ModalType, ProcessInfoType } from './types.sys'


export const SysActions = {
  modal_open:    createAction('@sys/MODAL_OPEN',    action => (payload: ModalType) => action(payload)),
  modal_close:   createAction('@sys/MODAL_CLOSE',   action => ()                   => action()),
  
  process_info:  createAction('@sys/PROCESS_INFO',  action => (payload: string)    => action(payload)),
  process_error: createAction('@sys/PROCESS_ERROR', action => (payload: string)    => action(payload)),
  process_close: createAction('@sys/PROCESS_CLOSE', action => ()                   => action()),


}