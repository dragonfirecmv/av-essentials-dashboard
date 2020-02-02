//#region Imports
import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { IGoodsResponse } from '~/core/redux/gallery/goods'
import './_packageItemEditDetails.scss'
import { CommonPlaceholderVendor } from '~/static/img'
import { AVButton, AVInput } from '~/components/controls'
import { IPackageResponse } from '~/core/redux/gallery/packages'
//#endregion


export const PanelPackageItemEditDetailsView = (props: IProps) => {

  const [packageItemData, setPackageItemData] = useState(null as IPackageResponse)

  useEffect(() => {

    if (props.loadingMode) setPackageItemData(null)

    if (packageItemData !== props.package_item)
      setPackageItemData(props.package_item)

  }, [props.package_item, props.loadingMode])

  return (
    <div className="panel-package-item-edit-details-view">

      <div className="section picture">
        <div className="picture-enclosing">
          <img src={packageItemData?.media && packageItemData?.media[0]?.url || CommonPlaceholderVendor} />
        </div>
      </div>

      <div className="section">
        <AVInput
          id="input-vendor-name"
          inputLabel="Package name"
          forceEmpty={props.loadingMode}
          onChange={e => props.onDetailsChange({ e, type: 'name', value: e.target.value })}
          value={packageItemData?.package_name || ' '} />
        <AVInput
          id="input-description"
          inputLabel="Description"
          forceEmpty={props.loadingMode}
          onChange={e => props.onDetailsChange({ e, type: 'desc', value: e.target.value })}
          value={packageItemData?.description || ' '} />
        <AVInput
          id="input-price"
          inputLabel="Price Total"
          forceEmpty={props.loadingMode}
          onChange={e => props.onDetailsChange({ e, type: 'price_total', value: e.target.value })}
          value={packageItemData?.price_total || ' '} />
        <AVInput
          id="input-info"
          inputLabel="Minimum order details"
          forceEmpty={props.loadingMode}
          onChange={e => props.onDetailsChange({ e, type: 'min_order_details', value: e.target.value })}
          value={packageItemData?.min_order_details || ' '} />

        <AVInput
          id="input-info"
          inputLabel="Minimum order price"
          forceEmpty={props.loadingMode}
          onChange={e => props.onDetailsChange({ e, type: 'min_order_price', value: e.target.value })}
          value={packageItemData?.min_order_price || ' '} />
        <AVInput
          id="input-currency"
          inputLabel="Currency code (by vendor)"
          forceEmpty={props.loadingMode}
          locked={true}
          value={packageItemData?.vendor_owner?.vendor_currency_code || 'IDR'} />
      </div>

    </div>
  )
}

interface IProps {
  loadingMode?: boolean
  package_item?: IPackageResponse

  onDetailsChange?: any
}