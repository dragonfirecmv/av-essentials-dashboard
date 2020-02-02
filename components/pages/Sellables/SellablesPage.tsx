// #region Imports
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import './_sellables.scss'
import { AVButton, AVToggleButton } from '~/components/controls'

import { IAppState } from '~/core/redux'
import { IGalleryState } from '~/core/redux/gallery'
import { capitalizeFirstLetter } from '~/core/libs/tools/string-helper'
import { TableGoodsListView, IGoodsListTableItemClickEvent, TablePackageListView, IPackageListTableItemClickEvent } from '~/components/views/tables'
import { GalleryGoodsActions, IGoodsResponse } from '~/core/redux/gallery/goods'
import { GalleryPackageActions, IPackageResponse } from '~/core/redux/gallery/packages'
import { SysActions } from '~/core/redux/sys'
// import { TableVendorListView } from '~/components/views/tables'
// #endregion


export const SellablesPage = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)

  const [tabSelected, setTabSelected] = useState('goods' as 'goods' | 'packages')

  useEffect(() => {
    dispatch(GalleryGoodsActions.listAll_request())
    dispatch(GalleryPackageActions.listAll_request())
  }, [])

  const _onRefreshListClick = e => {
    dispatch(GalleryGoodsActions.listAll_request())
    dispatch(GalleryPackageActions.listAll_request())
  }

  const _onAddNewItemClick = e => {
    window.location.href = (`/sellables/edit-${tabSelected}?create=new`)
  }

  const _onItemClick = (e: IGoodsListTableItemClickEvent | IPackageListTableItemClickEvent) => {
    switch (e.type) {
      case 'edit':
        window.location.href = (`/sellables/edit-${tabSelected}?id=${e.meta?.id}`)
        break

      case 'delete':
        switch (tabSelected) {
          case 'goods':
            dispatch(GalleryGoodsActions.test_set_selected((e.meta as IGoodsResponse)))
            dispatch(SysActions.modal_open('Delete Goods'))
            break

          case 'packages':
            dispatch(GalleryPackageActions.test_set_selected((e.meta as IPackageResponse)))
            dispatch(SysActions.modal_open('Delete Package'))
            break
        }
        break

    }
  }


  return (
    <div class="sellables-page">
      <div className="command-bar">
        <div className="area-title">
          <div className="tx page-subtitle">Listing all</div>
          <div className="tx page-title">Sellables :: {capitalizeFirstLetter(tabSelected)}</div>
        </div>
        <div className="area-tab">
          <AVToggleButton
            onClick={() => setTabSelected('goods')}
            checked={tabSelected === 'goods'}>
            Goods
          </AVToggleButton>
          <AVToggleButton
            onClick={() => setTabSelected('packages')}
            checked={tabSelected === 'packages'}>
            Packages
          </AVToggleButton>
        </div>
        <div className="area-actions">
          <div className="bordered">
            <AVButton btnStyle="tertiary" onClick={_onRefreshListClick}>
              Refresh list
            </AVButton>
          </div>
          <div className="bordered" onClick={_onAddNewItemClick}>
            <AVButton btnStyle="tertiary">
              + Add new {tabSelected} item
            </AVButton>
          </div>
        </div>
      </div>
      <div className="content">
        <div style={{ display: tabSelected !== 'goods' ? 'none' : '' }}>
          <TableGoodsListView
            onItemClick={_onItemClick}
            enableEdit={true}
            enableDelete={true} />
        </div>
        <div style={{ display: tabSelected !== 'packages' ? 'none' : '' }}>
          <TablePackageListView
            onItemClick={_onItemClick}
            enableEdit={true}
            enableDelete={true} />
        </div>

      </div>
    </div>
  )
}