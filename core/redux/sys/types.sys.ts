import { ConnectionStatus } from "~/core/libs/types/global-status.type";


export interface ISysState {
  locale: string
  status: ISysStateStatus
  modal: ISysStateModal
  toast: ISysStateToast
  theme: ISysStateTheme,
  process_info: ISysStateProcessInfo
}

export interface ISysStateProcessInfo {
  show: ProcessInfoType
  process_msg: ''
}

export interface ISysStateTheme {
  skin: ThemeSkin
}

export interface ISysStateToast {
  history?: ISysStateToastMessage[]
  timeout_in_ms: number
}

export interface ISysStateToastMessage {
  timestamp: string
  title: string
  content: string
  type: ToastType
}

export interface ISysStateModal {
  show: ModalType
  meta?: any
}

export interface ISysStateStatus {
  app_status: 'normal' | 'paused'
  network_connection: ConnectionStatus
}


export type ProcessInfoType = 
    'none'
  | 'processing'
  | 'error'

export type ThemeSkin = 
    'light'
  | 'dark'

export type ToastType = 
  'none'
  | 'info'
  | 'warning'
  | 'error'

export type ModalType = 
  'none'
  | 'Select vendor'
  | 'Select package'
  | 'Select goods item'
  | 'Select account'
  | 'Image Editor'
  | 'Delete Vendor'
  | 'Delete Goods'
  | 'Delete Package'