// #region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'

import './_tableVendorList.scss'
import { CommonPlaceholderVendor } from '~/static/img'
import { AVChip, AVButton } from '~/components/controls'
import { IconEdit, IconDelete } from '~/components/gylph'

import { IAppState } from '~/core/redux'
import { IGalleryState } from '~/core/redux/gallery'
import { IVendorResponse } from '~/core/redux/gallery/vendors'
import { BaseServerStatus } from '~/core/libs/types/global-status.type'
// #endregion


export const TableVendorListView = (props: IProps) => {

  const [status, setStatus] = useState('idle' as BaseServerStatus)
  const [vendorList, setVendorList] = useState(null as IVendorResponse[])
  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)

  const cssStyleAdditional = {
    display: props.lite && 'none' || ''
  }

  useEffect(() => {
    const serverStatus = galleryState.vendors.listing.meta.server_status

    setStatus(serverStatus)

    if (serverStatus === 'finished')
      setVendorList(galleryState.vendors.listing.vendors)

  }, [galleryState.vendors.listing])

  const cssClass = `
    view-table-vendor-list \
    ${props.lite && 'lite' || ''} \
    ${props.enableSelect && 'selectable' || '' }
  `.replace(/\s+/g,' ').trim();


  const _onItemClick = (type: 'select' | 'edit' | 'delete', e, meta) => {
    e.stopPropagation();
    if (type === 'select' && !props.enableSelect ||
        type === 'edit' && !props.enableEdit ||
        type === 'delete' && !props.enableDelete) return

    props.onItemClick && props.onItemClick({
      type,
      e,
      meta
    })
  }


  const _renderContent = () => (
    <F>
      {
        vendorList?.map(vendor => (
          <div 
            className={`table row ${props.lite && 'lite'}`} 
            onClick={e => _onItemClick('select', e, vendor)}>
            <div className="table-col picture">
              <div className="picture-enclosing">
                <img src={vendor?.vendor_logo_url?.url || vendor?.media[0]?.url || CommonPlaceholderVendor} />
              </div>
            </div>
            <div className="table-col info">
              <div className="tx info-title">{vendor?.vendor_name}</div>
              <div className="tx info-subtitle">{vendor?.owned_by_who?.email}</div>
            </div>
            <div className="table-col categories" style={cssStyleAdditional}>
              {
                vendor?.vendor_categories?.map(vendor_category => (
                  <AVChip text={vendor_category?.name} />
                ))
              }
            </div>
            <div className="table-col address" style={cssStyleAdditional}>
              <div className="tx address-text">
                {vendor?.vendor_addess}
              </div>
            </div>
            <div className="table-col actions" style={cssStyleAdditional}>
              <AVButton btnStyle="tertiary" onClick={e => _onItemClick('edit', e, vendor)}>
                <IconEdit id="edit-vendor"/>
              </AVButton>
              <AVButton btnStyle="tertiary" onClick={e => _onItemClick('delete', e, vendor)}>
                <IconDelete id="delete-vendor"/>
              </AVButton>
            </div>
          </div>
        ))
      }
    </F>
  )

  const _renderPlaceholder = () => (
    <div className="area-placeholder">
      <div className="tx loading-text">Loading...</div>
    </div>
  )
  
  
  return (
    <div class={cssClass}>
      <div className={`table header sticky ${props.lite && 'lite'}`}>
        <div className="table-col">

        </div>
        <div className="table-col">
          <div className="tx table-header">Info</div>
        </div>
        <div className="table-col" style={cssStyleAdditional}>
          <div className="tx table-header">Categories</div>
        </div>
        <div className="table-col" style={cssStyleAdditional}>
          <div className="tx table-header">Address</div>
        </div>
        <div className="table-col" style={cssStyleAdditional}>

        </div>
      </div>

    {
      status === 'finished'
      && _renderContent()
      || _renderPlaceholder()
    }

    </div>
  )
}

//#region interfaces
interface IProps {
  enableSelect?: boolean
  enableEdit?: boolean
  enableDelete?: boolean
  lite?: boolean

  onItemClick?(e: IVendorListTableItemClickEvent): any
}

export interface IVendorListTableItemClickEvent {
  type: 'select' | 'edit' | 'delete',
  e: MouseEvent,
  meta: IVendorResponse
}
//#endregion