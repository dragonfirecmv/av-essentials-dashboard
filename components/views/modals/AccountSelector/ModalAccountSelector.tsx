//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux';
import './_accountSelector.scss'
import { IAppState } from '~/core/redux'
import { IGalleryState } from '~/core/redux/gallery'
// import { TableAccountListView } from '../../tables';
// import { GalleryAccountActions } from '~/core/redux/gallery/vendors'
// import { ToolsAccountSelectorActions } from '~/core/redux/tools/vendorSelector';
import { SysActions } from '~/core/redux/sys';
//#endregion


export const ModalAccountSelectorView = () => {

  const dispatch = useDispatch()
  // const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)

  // useEffect(() => {
  //   dispatch(ToolsAccountSelectorActions.vendorSelector_new())
  //   dispatch(GalleryAccountActions.listAll_request())
  // }, [])

  // const _onItemClick = e => {
  //   dispatch(ToolsAccountSelectorActions.vendorSelector_setSelected(e.meta))
  //   dispatch(SysActions.modal_close())
  // }

  return (
    <div className="view-modal-account-selector">
      {/* <TableAccountListView
        lite={true}
        enableSelect={true}
        onItemClick={_onItemClick}/> */}
    </div>
  )
}