//#region Imports
import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { IGoodsResponse } from '~/core/redux/gallery/goods'
import './_goodsItemEditDetails.scss'
import { CommonPlaceholderVendor } from '~/static/img'
import { AVButton, AVInput } from '~/components/controls'
//#endregion


export const PanelGoodsItemEditDetailsView = (props: IProps) => {

  const [goodsItemData, setGoodsItemData] = useState(null as IGoodsResponse)

  useEffect(() => {

    if (props.loadingMode) setGoodsItemData(null)

    if (goodsItemData !== props.goods_item)
      setGoodsItemData(props.goods_item)

  }, [props.goods_item, props.loadingMode])

  return (
    <div className="panel-goods-item-edit-details-view">

      <div className="section picture">
        <div className="picture-enclosing">
          <img src={goodsItemData?.media && goodsItemData?.media[0]?.url || CommonPlaceholderVendor} />
        </div>
      </div>

      <div className="section">
        <AVInput
          id="input-vendor-name"
          inputLabel="Item name"
          forceEmpty={props.loadingMode}
          onChange={e => props.onDetailsChange({ e, type: 'name', value: e.target.value })}
          value={goodsItemData?.main_label || ' '} />
        <AVInput
          id="input-description"
          inputLabel="Description"
          forceEmpty={props.loadingMode}
          onChange={e => props.onDetailsChange({ e, type: 'desc', value: e.target.value })}
          value={goodsItemData?.description || ' '} />
        <AVInput
          id="input-price"
          inputLabel="Price"
          forceEmpty={props.loadingMode}
          onChange={e => props.onDetailsChange({ e, type: 'price', value: e.target.value })}
          value={goodsItemData?.price || ' '} />
        <AVInput
          id="input-info"
          inputLabel="Additional Info"
          forceEmpty={props.loadingMode}
          onChange={e => props.onDetailsChange({ e, type: 'info', value: e.target.value })}
          value={goodsItemData?.additional_info || ' '} />

        <AVInput
          id="input-currency"
          inputLabel="Currency code (by vendor)"
          forceEmpty={props.loadingMode}
          locked={true}
          value={goodsItemData?.owned_by?.vendor_currency_code || 'IDR'} />
      </div>

    </div>
  )
}

interface IProps {
  loadingMode?: boolean
  goods_item?: IGoodsResponse

  onDetailsChange?: any
}