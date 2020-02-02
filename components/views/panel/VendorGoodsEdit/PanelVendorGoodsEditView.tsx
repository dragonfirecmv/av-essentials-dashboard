//#region Imports
import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux'
import { IVendorResponse } from '~/core/redux/gallery/vendors'
import './_vendorGoodsEdit.scss'
import { IAppState } from '~/core/redux'
import { CommonPlaceholderVendor } from '~/static/img'
import { AVButton, AVInput } from '~/components/controls'
import { SysActions } from '~/core/redux/sys'
import { ToolsImageEditorActions } from '~/core/redux/tools/imageEditor'
import { IGoodsResponse, GalleryGoodsActions } from '~/core/redux/gallery/goods'
import { TableGoodsListView, IGoodsListTableItemClickEvent } from '~/components/views/tables'
//#endregion


export const PanelVendorGoodsEditView = (props: IProps) => {

  const dispatch = useDispatch()
  const rootState = useSelector<IAppState, IAppState>(state => state)

  const [goodsData, setGoodsData] = useState(null as IGoodsResponse[])

  useEffect(() => {

    if (props.loadingMode) setGoodsData(null)

    if (goodsData !== props.goods_data) {
      setGoodsData(props.goods_data)
      dispatch(GalleryGoodsActions.test_set_listing(props.goods_data))
    }

  }, [props.goods_data, props.loadingMode])


  const _onItemClick = (e: IGoodsListTableItemClickEvent) => {
    switch (e.type) {
      case 'edit':
        window.location.href = (`/sellables/edit-goods?id=${e.meta?.id}&from_vendor=${props.vendor_slug}`)
        break

      case 'delete':
        dispatch(GalleryGoodsActions.test_set_selected(e.meta))
        dispatch(SysActions.modal_open('Delete Goods'))
        break
    }
  }

  return (
    <div className="view-panel-vendor-goods-edit">
      <TableGoodsListView
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
  goods_data?: IGoodsResponse[]

  // onGoodsChange?: any
}