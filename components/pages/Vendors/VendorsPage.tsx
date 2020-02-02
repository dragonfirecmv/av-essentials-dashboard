// #region Imports
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import './_vendors.scss'
import { AVButton } from '~/components/controls'

import { IAppState } from '~/core/redux'
import { IGalleryState } from '~/core/redux/gallery'
import { GalleryVendorActions } from '~/core/redux/gallery/vendors'
import { TableVendorListView, IVendorListTableItemClickEvent } from '~/components/views/tables'
import { SysActions } from '~/core/redux/sys'
// #endregion


export const VendorsPage = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)

  useEffect(() => {
    dispatch(GalleryVendorActions.listAll_request())
  }, [])


  const _onRefreshListClick = e => {
    dispatch(GalleryVendorActions.listAll_request())
  }

  const _onAddNewVendorClick = e => {
    window.location.href = ('/vendors/edit?create=new')
  }

  const _onItemClick = (e: IVendorListTableItemClickEvent) => {
    switch (e.type) {
      case 'edit':
        window.location.href = (`/vendors/edit?slug=${e.meta?.slug}`)
        break

      case 'delete':
        dispatch(GalleryVendorActions.test_set_selected(e.meta))
        dispatch(SysActions.modal_open('Delete Vendor'))
        break
    }
  }

  return (
    <div class="vendor-page">
      <div className="command-bar">
        <div className="area-title">
          <div className="tx page-subtitle">Listing all</div>
          <div className="tx page-title">Vendors</div>
        </div>
        <div className="area-tab">

        </div>
        <div className="area-actions">
          <div className="bordered">
            <AVButton btnStyle="tertiary" onClick={_onRefreshListClick}>
              Refresh list
            </AVButton>
          </div>
          <div className="bordered">
            <AVButton btnStyle="tertiary" onClick={_onAddNewVendorClick}>
              + Add new vendor
            </AVButton>
          </div>
        </div>
      </div>
      <div className="content">
        <TableVendorListView
          enableEdit={true}
          enableDelete={true}
          onItemClick={e => _onItemClick(e)} />
      </div>
    </div>
  )
}