// #region Imports
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'
import './_accounts.scss'
import { IAppState } from '~/core/redux'
import { IGalleryState } from '~/core/redux/gallery'
import { AVButton } from '~/components/controls'
// import { TableVendorListView } from '~/components/views/tables'
// #endregion


export const AccountsPage = () => {

  const dispatch = useDispatch()
  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)

  useEffect(() => {
    // dispatch(GalleryVendorActions.listAll_request())
  }, [])

  const _onRefreshListClick = e => {
    // dispatch(GalleryVendorActions.listAll_request())
  }

  return (
    <div class="accounts-page">
      <div className="command-bar">
        <div className="area-title">
          <div className="tx page-subtitle">Listing all</div>
          <div className="tx page-title">Accounts</div>
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
            <AVButton btnStyle="tertiary">
              + Add new account
            </AVButton>
          </div>
        </div>
      </div>
      <div className="content">
        

      </div>
    </div>
  )
}