//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux';
import './_packageSelector.scss'
import { IAppState } from '~/core/redux'
import { IGalleryState } from '~/core/redux/gallery'
import { TablePackageListView } from '../../tables';
import { GalleryPackageActions } from '~/core/redux/gallery/packages'
import { ToolsPackageSelectorActions } from '~/core/redux/tools/packageSelector';
import { SysActions } from '~/core/redux/sys';
//#endregion


export const ModalPackageSelectorView = () => {

  const dispatch = useDispatch()
  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)

  useEffect(() => {
    dispatch(ToolsPackageSelectorActions.new())
    dispatch(GalleryPackageActions.listAll_request())
  }, [])

  const _onItemClick = e => {
    dispatch(ToolsPackageSelectorActions.setSelected(e.meta))
    dispatch(SysActions.modal_close())
  }

  return (
    <div className="view-modal-package-selector">
      {/* <TablePackageListView
        lite={true}
        enableSelect={true}
        onItemClick={_onItemClick}/> */}
    </div>
  )
}