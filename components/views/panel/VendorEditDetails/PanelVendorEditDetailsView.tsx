//#region Imports
import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux'
import { IVendorResponse } from '~/core/redux/gallery/vendors'
import './_vendorEditDetails.scss'
import { IAppState } from '~/core/redux'
import { CommonPlaceholderVendor } from '~/static/img'
import { AVButton, AVInput } from '~/components/controls'
import { SysActions } from '~/core/redux/sys'
import { ToolsImageEditorActions } from '~/core/redux/tools/imageEditor'
//#endregion


export const PanelVendorEditDetailsView = (props: IProps) => {

  const dispatch = useDispatch()
  const rootState = useSelector<IAppState, IAppState>(state => state)

  const [vendorData, setVendorData] = useState(null as IVendorResponse)

  useEffect(() => {

    if (props.loadingMode) setVendorData(null)

    if (vendorData !== props.vendor_data)
      setVendorData(props.vendor_data)

  }, [props.vendor_data, props.loadingMode])

  const _onImageHoverClick = e => {
    if (vendorData?.vendor_logo_url?.url && !rootState.tools.image_editor.raw_data)
      dispatch(ToolsImageEditorActions.setRaw(vendorData?.vendor_logo_url?.url))

    dispatch(SysActions.modal_open('Image Editor'))
  }

  return (
    <div className="panel-vendor-edit-details-view">

      <div className="section picture">
        <div className={`picture-enclosing ${props.loadingMode !== true && 'ready' || ''}`}>
          <img src={
            props.loadingMode
              ? CommonPlaceholderVendor
              : rootState.tools.image_editor.processed_data
              || vendorData?.vendor_logo_url?.url
              || CommonPlaceholderVendor} />

          <div className="overlay-edit" onClick={_onImageHoverClick}>
            <div className="tx overlay">Edit image</div>
          </div>
        </div>
      </div>

      <div className="section">
        <AVInput
          id="input-vendor-name"
          inputLabel="Vendor name"
          forceEmpty={props.loadingMode}
          onChange={e => props.onVendorChange({ e, type: 'name', value: e.target.value })}
          value={vendorData?.vendor_name || ' '} />
        <AVInput
          id="input-description"
          inputLabel="Description"
          forceEmpty={props.loadingMode}
          onChange={e => props.onVendorChange({ e, type: 'desc', value: e.target.value })}
          value={vendorData?.vendor_description || ' '} />
        <AVInput
          id="input-email"
          inputLabel="Email"
          forceEmpty={props.loadingMode}
          onChange={e => props.onVendorChange({ e, type: 'email', value: e.target.value })}
          value={vendorData?.vendor_email || ' '} />
        <AVInput
          id="input-address"
          inputLabel="Address"
          forceEmpty={props.loadingMode}
          onChange={e => props.onVendorChange({ e, type: 'address', value: e.target.value })}
          value={vendorData?.vendor_addess || ' '} />
        <AVInput
          id="input-contact"
          inputLabel="Contact"
          forceEmpty={props.loadingMode}
          onChange={e => props.onVendorChange({ e, type: 'contact', value: e.target.value })}
          value={vendorData?.vendor_contacts || ' '} />

        <AVInput
          id="input-currency"
          inputLabel="Currency code"
          forceEmpty={props.loadingMode}
          locked={true}
          value={vendorData?.vendor_currency_code || 'IDR'} />

        <AVInput
          id="input-locale"
          inputLabel="Localization code"
          forceEmpty={props.loadingMode}
          locked={true}
          value={vendorData?.vendor_localization_code || 'id-ID'} />
      </div>

    </div>
  )
}

interface IProps {
  loadingMode?: boolean
  vendor_data?: IVendorResponse

  onVendorChange?: any
}