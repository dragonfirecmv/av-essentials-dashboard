//#region Imports
import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux';
import './_ownerVendor.scss'
import { IAppState } from '~/core/redux'
import { IGalleryState } from '~/core/redux/gallery'
import { CommonPlaceholderVendor } from '~/static/img'
import { AVButton, AVInput } from '~/components/controls'
import { IVendorResponse } from '~/core/redux/gallery/vendors'
import { SysActions } from '~/core/redux/sys';
//#endregion


export const PanelOwnerVendorView = (props: IProps) => {

  const [vendorSelected, setVendorSelected] = useState(null as IVendorResponse)

  const dispatch = useDispatch()
  const rootState = useSelector<IAppState, IAppState>(state => state)

  useEffect(() => {
    const vendorS = rootState.tools.vendor_selector

    if (!!vendorS.selected_vendor)
      setVendorSelected(vendorS.selected_vendor)
    
  }, [rootState.tools.vendor_selector])

  useEffect(() => {
    if (!props.loadingMode && props.selected_vendor)
      setVendorSelected(props.selected_vendor)
  }, [props.selected_vendor, props.loadingMode])

  useEffect(() => {
    props.onVendorChange && props.onVendorChange({ vendorSelected })
  }, [vendorSelected])


  const _onVendorChangeClick = e => {
    dispatch(SysActions.modal_open('Select vendor'))
  }

  return (
    <div className="view-panel-owner-vendor">
      <AVButton
        onClick={_onVendorChangeClick}
        btnStyle="tertiary"
        size="conform">
        <div className="card-vendor-details">
          <div className="section-pic">
            <div className="enclosing-image">
              <img src={
                !props.loadingMode
                && vendorSelected?.vendor_logo_url?.url 
                  || CommonPlaceholderVendor
              } alt="" />
            </div>
          </div>
          <div className="section-vendor-detail">
            <div className="tx owner-vendor-info">Owned by vendor:</div>
            <div className="tx owner-vendor-name">
              {
                props.loadingMode
                ? 'Loading...'
                : vendorSelected?.vendor_name 
                  || 'Not selected'
              }
            </div>
          </div>
        </div>
      </AVButton>
    </div>
  )
}

interface IProps {
  loadingMode?: boolean
  selected_vendor?: IVendorResponse

  onVendorChange?: any
}