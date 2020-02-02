//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux';
import './_deleteAVendor.scss'
import { AVButton } from '~/components/controls'
import { IAppState } from '~/core/redux';
import { SysActions } from '~/core/redux/sys';
import { CommonPlaceholderVendor } from '~/static/img';
import { GalleryVendorActions } from '~/core/redux/gallery/vendors';
import { IGalleryState } from '~/core/redux/gallery';
//#endregion


export const ModalDeleteAVendorView = () => {

  const dispatch = useDispatch()
  const appState = useSelector<IAppState, IAppState>(state => state)
  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)

  useEffect(() => {
    const gallVenSelected = galleryState.vendors.selected

    if (gallVenSelected.meta.server_action === 'gallery-vendor-delete') {

      if (gallVenSelected.meta.server_status === 'finished'){
        dispatch(SysActions.process_error('Vendor deleted successfully.'))
        dispatch(SysActions.modal_close())
      }

      if (gallVenSelected.meta.server_status === 'error'){
        dispatch(SysActions.process_error('ERROR: Vendor failed to be deleted.'))
        dispatch(SysActions.modal_close())
      }

      dispatch(GalleryVendorActions.listAll_request())
    }

  }, [galleryState.vendors.selected])

  const _onDeleteClick = e => {
    dispatch(SysActions.process_info('Deleting vendor...'))

    dispatch(GalleryVendorActions.delete_request({ slug: appState.gallery.vendors.selected.vendor?.slug }))
  }

  return (
    <div className="view-modal-delete-a-vendor">
      <div className="area-title">
        <div className="tx modal-title">This action WILL be permanent, continue?</div>
      </div>

      <div className="area-content">
        <div className="section-vendor-img">
          <div className="image-enclosure">
            <img src={appState.gallery.vendors.selected.vendor?.vendor_logo_url?.url || CommonPlaceholderVendor} alt="" />
          </div>
        </div>
        <div className="section-vendor-info">
          <div className="tx vendor-name">
            {appState.gallery.vendors.selected.vendor?.vendor_name}
          </div>
          <div className="tx vendor-address">
            {appState.gallery.vendors.selected.vendor?.vendor_addess || 'Unknown'}
          </div>
          <div className="tx vendor-email">
            {appState.gallery.vendors.selected.vendor?.vendor_email || 'Unknown'}
          </div>
        </div>
      </div>

      <div className="area-actions">
        <div className="btn-enclosure">
          <AVButton
            size="large"
            onClick={_onDeleteClick}
            btnStyle="danger">
            Delete vendor
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