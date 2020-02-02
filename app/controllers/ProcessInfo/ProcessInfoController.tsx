//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux';
import './_processInfo.scss'

import { SysActions } from '~/core/redux/sys';
import { AVButton, AVSpinner } from '~/components/controls';
import { IAppState } from '~/core/redux';
//#endregion


export const ProcessInfoController = () => {

  const dispatch = useDispatch()
  const appState = useSelector<IAppState, IAppState>(state => state)

  const _onCloseClick = (e: MouseEvent) => {
    dispatch(SysActions.process_close())
  }

  const cssClass = `
    process-info-modal
    ${appState.sys.process_info.show === 'none' ? 'hide' : ''}
  `

  return (
    <div class={cssClass} data-theme="light">
      <div class="procinfo-dialog">
        <div className="area-content">
          {
            appState.sys.process_info.show === 'processing' && (
              <div className="area-loadingani">
                <AVSpinner
                  backgroundColor="var(--color-button-primary-background-hover)"
                  prominentColor="var(--color-button-primary-background-default)"
                  thickness="8px"
                  height="30px"
                  width="30px" />
              </div>
            )
          }
          <div className="tx title">
            {appState.sys.process_info.process_msg}
          </div>
        </div>
        {
          appState.sys.process_info.show === 'error' && (
            <div className="area-action">
              <div className="btn-enclosure">
                <AVButton onClick={_onCloseClick}>
                  Close
                </AVButton>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}