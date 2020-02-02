//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux';
import './_deleteAGoodsItem.scss'
import { AVButton } from '~/components/controls'
import { IAppState } from '~/core/redux';
import { SysActions } from '~/core/redux/sys';
import { CommonPlaceholderVendor } from '~/static/img';
import { GalleryVendorActions } from '~/core/redux/gallery/vendors';
import { IGalleryState } from '~/core/redux/gallery';
import { GalleryGoodsActions } from '~/core/redux/gallery/goods';
//#endregion


export const ModalDeleteAGoodsItemView = () => {

  const dispatch = useDispatch()
  const appState = useSelector<IAppState, IAppState>(state => state)
  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)

  useEffect(() => {
    const gallGoodsItemSelected = galleryState.goods.selected

    if (gallGoodsItemSelected.meta.server_action === 'gallery-goods-delete') {

      if (gallGoodsItemSelected.meta.server_status === 'finished'){
        dispatch(SysActions.process_error('Goods item deleted successfully. Please reload the page to see changes.'))
        dispatch(SysActions.modal_close())
      }

      if (gallGoodsItemSelected.meta.server_status === 'error'){
        dispatch(SysActions.process_error('ERROR: Goods item failed to be deleted.'))
        dispatch(SysActions.modal_close())
      }

      // dispatch(GalleryGoodsActions.listAll_request())
    }

  }, [galleryState.goods.selected])

  const _onDeleteClick = e => {
    dispatch(SysActions.process_info('Deleting item...'))

    dispatch(GalleryGoodsActions.delete_request({ id: appState.gallery.goods.selected.goods_info?.id }))
  }

  return (
    <div className="view-modal-delete-a-goods-item">
      <div className="area-title">
        <div className="tx modal-title">This action WILL be permanent, continue?</div>
      </div>

      <div className="area-content">
        <div className="section-goods-img">
          <div className="image-enclosure">
            <img src={appState.gallery.goods.selected.goods_info?.media && appState.gallery.goods.selected.goods_info?.media[0]?.url || CommonPlaceholderVendor} alt="" />
          </div>
        </div>
        <div className="section-goods-info">
          <div className="tx goods-name">
            {appState.gallery.goods.selected.goods_info?.main_label}
          </div>
          <div className="tx goods-address">
            {`Owned by ${appState.gallery.goods.selected.goods_info?.owned_by?.vendor_name}` || 'Owner vendor info not found'}
          </div>
          <div className="tx goods-email">
            {appState.gallery.goods.selected.goods_info?.id || 'Unknown ID'}
          </div>
        </div>
      </div>

      <div className="area-actions">
        <div className="btn-enclosure">
          <AVButton
            size="large"
            onClick={_onDeleteClick}
            btnStyle="danger">
            Delete item
          </AVButton>
        </div>
        <div className="btn-enclosure">
          <AVButton
            onClick={() => dispatch(SysActions.modal_close())}
            btnStyle="tertiary">
            Cancel
          </AVButton>
        </div>
      </div>
    </div>
  )
}