//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux';
import './_goodsSelector.scss'
import { IAppState } from '~/core/redux'
import { IGalleryState } from '~/core/redux/gallery'
import { TableGoodsListView } from '../../tables';
import { GalleryGoodsActions } from '~/core/redux/gallery/goods'
import { ToolsGoodsSelectorActions } from '~/core/redux/tools/goodsSelector';
import { SysActions } from '~/core/redux/sys';
//#endregion


export const ModalGoodsSelectorView = () => {

  const dispatch = useDispatch()
  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)

  useEffect(() => {
    dispatch(ToolsGoodsSelectorActions.goodsSelector_new())
    dispatch(GalleryGoodsActions.listAll_request())
  }, [])

  const _onItemClick = e => {
    dispatch(ToolsGoodsSelectorActions.goodsSelector_setSelected(e.meta))
    dispatch(SysActions.modal_close())
  }

  return (
    <div className="view-modal-goods-selector">
      {/* <TableGoodsListView
        lite={true}
        enableSelect={true}
        onItemClick={_onItemClick}/> */}
    </div>
  )
}