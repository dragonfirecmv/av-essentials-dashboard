//#region Imports
import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux'
import { IVendorResponse } from '~/core/redux/gallery/vendors'
import './_vendorPackageEdit.scss'
import { IAppState } from '~/core/redux'
import { CommonPlaceholderVendor } from '~/static/img'
import { AVButton, AVInput } from '~/components/controls'
import { SysActions } from '~/core/redux/sys'
import { ToolsImageEditorActions } from '~/core/redux/tools/imageEditor'
import { IGoodsResponse, GalleryGoodsActions } from '~/core/redux/gallery/goods'
import { TableGoodsListView, TablePackageListView, IPackageListTableItemClickEvent } from '../../tables'
import { IPackageResponse, GalleryPackageActions } from '~/core/redux/gallery/packages'
//#endregion


export const PanelVendorPackageEditView = (props: IProps) => {

  const dispatch = useDispatch()
  const rootState = useSelector<IAppState, IAppState>(state => state)

  // const [goodsData, setGoodsData] = useState(null as IGoodsResponse[])
  const [packagesData, setPackagesData] = useState(null as IPackageResponse[])

  useEffect(() => {

    if (props.loadingMode) setPackagesData(null)

    if (packagesData !== props.packages_data) {
      setPackagesData(props.packages_data)
      dispatch(GalleryPackageActions.test_set_listing(props.packages_data))
    }

  }, [props.packages_data, props.loadingMode])


  const _onItemClick = (e: IPackageListTableItemClickEvent) => {
    switch (e.type) {
      case 'edit':
        window.location.href = (`/sellables/edit-packages?id=${e.meta?.id}&from_vendor=${props.vendor_slug}`)
        break

      case 'delete':
        dispatch(GalleryPackageActions.test_set_selected(e.meta))
        dispatch(SysActions.modal_open('Delete Package'))
        break
    }
  }

  return (
    <div className="view-panel-vendor-package-edit">
      <TablePackageListView
        onItemClick={_onItemClick}
        enableEdit={true}
        enableDelete={true}
        minimal={true} />

    </div>
  )
}

interface IProps {
  loadingMode?: boolean
  vendor_slug: string
  packages_data?: IPackageResponse[]

  // onGoodsChange?: any
}