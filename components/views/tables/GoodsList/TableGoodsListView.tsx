// #region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'

import './_tableGoodsList.scss'
import { CommonPlaceholderVendor } from '~/static/img'
import { AVChip, AVButton } from '~/components/controls'
import { IconEdit, IconDelete } from '~/components/gylph'

import { IGoodsResponse } from '~/core/redux/gallery/goods'
import { BaseServerStatus } from '~/core/libs/types/global-status.type'
import { IAppState } from '~/core/redux'
import { IGalleryState } from '~/core/redux/gallery'
// #endregion


export const TableGoodsListView = (props: IProps) => {


  const [status, setStatus] = useState('idle' as BaseServerStatus)
  const [goodsList, setGoodsList] = useState(null as IGoodsResponse[])
  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)

  useEffect(() => {
    const serverStatus = galleryState.goods.listing.meta.server_status

    setStatus(serverStatus)

    if (serverStatus !== 'loading')
      setGoodsList(galleryState.goods.listing.goods_list)

  }, [galleryState.goods.listing])

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
        goodsList?.map(goodsItem => (
          <div className="table row" onClick={e => _onItemClick('select', e, goodsItem)}>
            <div className="table-col picture">
              <div className="picture-enclosing">
                <img src={goodsItem?.media && goodsItem?.media[0]?.url || CommonPlaceholderVendor} />
              </div>
            </div>
            <div className="table-col info">
              <div className="tx info-title">{goodsItem?.main_label}</div>
              <div className="tx info-subtitle">{goodsItem?.owned_by?.vendor_name}</div>
            </div>
            {
              !props.minimal && (
                <div className="table-col categories">
                  <AVChip text={goodsItem?.category?.name} />
                </div>
              )
            }
            <div className="table-col address">
              <div className="tx address-text">
                {goodsItem?.description}
              </div>
            </div>
            <div className="table-col actions">
              <AVButton btnStyle="tertiary" onClick={e => _onItemClick('edit', e, goodsItem)}>
                <IconEdit id="edit-goods" />
              </AVButton>
              <AVButton btnStyle="tertiary" onClick={e => _onItemClick('delete', e, goodsItem)}>
                <IconDelete id="delete-goods" />
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
    <div class={`view-table-goods-list ${props.minimal ? 'minimal' : ''}`}>
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

  onItemClick?(e: IGoodsListTableItemClickEvent): any
  enableDelete?: boolean
}

export interface IGoodsListTableItemClickEvent {
  type: 'select' | 'edit' | 'delete',
  e: MouseEvent,
  meta: IGoodsResponse
}
//#endregion