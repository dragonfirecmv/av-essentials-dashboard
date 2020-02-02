// #region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'

import './_tablePackageList.scss'
import { CommonPlaceholderVendor } from '~/static/img'
import { AVChip, AVButton } from '~/components/controls'
import { IconEdit, IconDelete } from '~/components/gylph'

import { IPackageResponse } from '~/core/redux/gallery/packages'
import { BaseServerStatus } from '~/core/libs/types/global-status.type'
import { IAppState } from '~/core/redux'
import { IGalleryState } from '~/core/redux/gallery'
// #endregion


export const TablePackageListView = (props: IProps) => {


  const [status, setStatus] = useState('idle' as BaseServerStatus)
  const [packageList, setPackageList] = useState(null as IPackageResponse[])
  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)

  useEffect(() => {
    const serverStatus = galleryState.packages.listing.meta.server_status

    setStatus(serverStatus)

    if (serverStatus !== 'loading')
      setPackageList(galleryState.packages.listing.packages)

  }, [galleryState.packages.listing])

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
        packageList?.map(packageItem => (
          <div className="table row" onClick={e => _onItemClick('select', e, packageItem)}>
            <div className="table-col picture">
              <div className="picture-enclosing">
                <img src={packageItem?.media && packageItem?.media[0]?.url || CommonPlaceholderVendor} />
              </div>
            </div>
            <div className="table-col info">
              <div className="tx info-title">{packageItem?.package_name}</div>
              <div className="tx info-subtitle">{packageItem?.vendor_owner?.vendor_name}</div>
            </div>
            {
              !props.minimal && (
                <div className="table-col categories">
                  {
                    packageItem?.categories?.map(package_category => (
                      <AVChip text={package_category?.name} />
                    ))
                  }
                </div>
              )
            }
            <div className="table-col address">
              <div className="tx address-text">
                {packageItem?.desription}
              </div>
            </div>
            <div className="table-col actions">
              <AVButton btnStyle="tertiary" onClick={e => _onItemClick('edit', e, packageItem)}>
                <IconEdit id="edit-package" />
              </AVButton>
              <AVButton btnStyle="tertiary" onClick={e => _onItemClick('delete', e, packageItem)}>
                <IconDelete id="delete-package" />
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
    <div class={`view-table-package-list ${props.minimal ? 'minimal' : ''}`}>
      <div className="table header sticky">
        <div className="table-col">

        </div>
        <div className="table-col">
          <div className="tx table-header">Info</div>
        </div>
        {
          !props.minimal && (
            <div className="table-col">
              <div className="tx table-header">Category</div>
            </div>
          )
        }
        <div className="table-col">
          <div className="tx table-header">Description</div>
        </div>
        <div className="table-col">

        </div>
      </div>

      {
        status !== 'loading'
        && _renderContent()
        || _renderPlaceholder()
      }

    </div>
  )
}

//#region Interfaces
interface IProps {
  enableSelect?: boolean
  enableEdit?: boolean
  minimal?: boolean

  onItemClick?(e: IPackageListTableItemClickEvent): any
  enableDelete?: boolean
}

export interface IPackageListTableItemClickEvent {
  type: 'select' | 'edit' | 'delete',
  e: MouseEvent,
  meta: IPackageResponse
}
//#endregion