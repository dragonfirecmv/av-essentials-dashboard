//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux';
import './_vendorSelector.scss'
import { IAppState } from '~/core/redux'
import { IGalleryState } from '~/core/redux/gallery'
import { TableVendorListView } from '../../tables';
import { GalleryVendorActions } from '~/core/redux/gallery/vendors'
import { ToolsVendorSelectorActions } from '~/core/redux/tools/vendorSelector';
import { SysActions } from '~/core/redux/sys';
//#endregion


export const ModalVendorSelectorView = () => {

  const dispatch = useDispatch()
  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)

  useEffect(() => {
    dispatch(ToolsVendorSelectorActions.new())
    dispatch(GalleryVendorActions.listAll_request())
  }, [])

  const _onItemClick = e => {
    dispatch(ToolsVendorSelectorActions.setSelected(e.meta))
    dispatch(SysActions.modal_close())
  }

  return (
    <div className="view-modal-vendor-selector">
      <TableVendorListView
        lite={true}
        enableSelect={true}
        onItemClick={_onItemClick}/>
    </div>
  )
}