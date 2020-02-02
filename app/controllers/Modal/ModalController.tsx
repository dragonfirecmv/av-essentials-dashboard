//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux';
import './_modal.scss'

import { SysActions } from '~/core/redux/sys';
import { AVButton } from '~/components/controls';
import { IAppState } from '~/core/redux';
import { ModalVendorSelectorView, ModalImageEditorView, ModalDeleteAVendorView, ModalDeleteAGoodsItemView } from '~/components/views/modals';
//#endregion


export default () => {

  const dispatch = useDispatch()
  const appState = useSelector<IAppState, IAppState>(state => state)

  let ModalContent = (props) => <F />

  const _onBackgroundMouseDown = (e: MouseEvent) => dispatch(SysActions.modal_close())

  const _onContentMouseDown = (ev: MouseEvent) => {
    ev.preventDefault(); ev.stopPropagation()
  }

  const onModalSubmitClick = (e: MouseEvent) => {

  }

  switch (appState.sys.modal.show) {
    case 'Select vendor':
      ModalContent = ModalVendorSelectorView
      break;

    case 'Image Editor':
      ModalContent = ModalImageEditorView
      break;

    case 'Delete Vendor':
      ModalContent = ModalDeleteAVendorView
      break;

    case 'Delete Goods':
      ModalContent = ModalDeleteAGoodsItemView
      break;

    default:
      break;
  }

  const cssClass = `
    modal-composition
    ${appState.sys.modal.show === 'none' && 'hide'}
  `

  return (
    <div class={cssClass} onMouseDown={_onBackgroundMouseDown} data-theme="light">
      <div class="enclosure-content" onMouseDown={_onContentMouseDown}>
        <ModalContent />
        {/* <div class="content-title">
          <div class="enclosing-button">
            <AVButton
              className="button-close"
              onClick={onBackgroundClick}
              size="conform"
              btnStyle="tertiary">
              &times;
            </AVButton>
          </div>
          <div class="tx title">
            {appState.sys.modal.show !== 'none' && appState.sys.modal.show}
          </div>
        </div>
        <div class="content">
        </div> */}
      </div>
    </div>
  )
}