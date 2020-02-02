// #region Imports
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import './_goodsEditor.scss'
import { AVButton, AVToggleButton } from '~/components/controls'

import { IAppState } from '~/core/redux'
import { IGalleryState, IMedia } from '~/core/redux/gallery'
// import { GalleryVendorActions, IVendorResponse } from '~/core/redux/gallery/vendors'
import { IconBack } from '~/components/gylph'
import { IGoodsResponse, GalleryGoodsActions, IGoodsCreatePayload } from '~/core/redux/gallery/goods'
import { PanelGoodsItemEditDetailsView } from '~/components/views/panel/GoodsItemEditDetails/PanelGoodsItemEditDetailsView'
import { PanelEditCategoriesView, PanelGalleryMediaListView } from '~/components/views/panel'
import { PanelOwnerVendorView } from '~/components/views/panel/OwnerVendor/PanelOwnerVendorView'
import { IVendorResponse, GalleryVendorActions } from '~/core/redux/gallery/vendors'
import { ICategoryResponse } from '~/core/redux/gallery/categories'
import { SysActions } from '~/core/redux/sys'
// import { PanelVendorEditDetailsView, PanelEditCategoriesView } from '~/components/views/panel'
// #endregion


export const GoodsEditorPage = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)
  const query = new URLSearchParams(history.location.search)

  const [editMode, setEditMode] = useState('edit' as 'edit' | 'create')

  const [goodsItemSelected, setGoodsItemSelected] = useState(null as IGoodsResponse)
  const [ownerVendor, setOwnerVendor] = useState(null as IVendorResponse)
  const [tabMode, setTabMode] = useState('categories' as 'categories' | 'sellables' | 'gallery')
  const [isVendorLoading, setIsVendorLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [iGoodsName, setIGoodsName] = useState('')
  const [iGoodsDesc, setIGoodsDesc] = useState('')
  const [iGoodsPrice, setIGoodsPrice] = useState(0)
  const [iGoodsMoreInfo, setIGoodsMoreInfo] = useState('')
  const [iCategories, setICategories] = useState(null as ICategoryResponse[])
  const [iMedia, setIMedia] = useState(null as IMedia[])
  const [isMediaGalleryReady, setIsMediaGalleryReady] = useState(true)

  // Component initializationem
  useEffect(() => {

    dispatch(GalleryVendorActions.reset_selected())

    if (query.get('create') === 'new')
      setEditMode('create')

    else if (query.get('id'))
      dispatch(GalleryGoodsActions.getFromId_request({ id: query.get('id') }))
  }, [])


  // EFFECT :: Goods Selected
  useEffect(() => {
    const currGoods = galleryState.goods.selected

    setIsLoading(currGoods.meta.server_status === 'loading')

    if (editMode === 'edit') {
      if (currGoods.meta.server_status === 'finished') {
        if (currGoods.meta.server_action === 'gallery-goods-get_from_slug') {
          setGoodsItemSelected(currGoods.goods_info)
          setIGoodsName(currGoods.goods_info?.main_label)
          setIGoodsDesc(currGoods.goods_info?.description)
          setIGoodsPrice(parseInt(currGoods.goods_info?.price))
          setIGoodsMoreInfo(currGoods.goods_info?.additional_info)
          setICategories([currGoods.goods_info?.category])

          if (currGoods.goods_info?.owned_by?.id)
            dispatch(GalleryVendorActions.getFromSlug_request({ slug: currGoods.goods_info?.owned_by?.slug }))
        }
      }
    }
    else if (editMode === 'create') {
      const vendor_from = query.get('from_vendor')

      if (vendor_from)
        dispatch(GalleryVendorActions.getFromSlug_request({ slug: vendor_from }))
    }


  }, [galleryState.goods.selected])

    // EFFECT :: Goods Selected
    useEffect(() => {
      const currGoods = galleryState.goods.selected

      if (currGoods.meta.server_status === 'finished') {
        if (currGoods.meta.server_action === 'gallery-goods-create_new') {
          dispatch(SysActions.process_error('Goods item created.'))
          window.history.back()
          // history.push(`/sellables/edit-goods?id=${galleryState.goods.selected.goods_info?.id}`)
          // setEditMode('edit')
        }
        else if (currGoods.meta.server_action === 'gallery-goods-update') {
          dispatch(SysActions.process_error('Goods item updated.'))
          window.location.href = (`/sellables/edit-goods?id=${query.get('id')}`)
  
        }
      }
  
      else if (currGoods.meta.server_status === 'error') {
        if (currGoods.meta.server_action === 'gallery-goods-create_new') {
          dispatch(SysActions.process_error('Error while creating goods item. '))
        }
        else if (currGoods.meta.server_action === 'gallery-goods-update') {
          dispatch(SysActions.process_error('Updating goods item ERROR.'))
  
        }
      }
  
    }, [galleryState.goods.selected])

  // EFFECT :: Goods and Vendor Selected !!
  useEffect(() => {

    const currGoods = galleryState.goods.selected
    const currVendor = galleryState.vendors.selected

    setIsVendorLoading(currVendor.meta.server_status === 'loading' || currGoods.meta.server_status === 'loading')

    if (currVendor.meta.server_status === 'finished')
      if (ownerVendor !== currVendor.vendor)
        setOwnerVendor(currVendor.vendor)

  }, [galleryState.goods.selected, galleryState.vendors.selected])


  const _onNavBackClick = e => {
    if (query.get('from_vendor') && ownerVendor.slug)
      window.location.href = (`/vendors/edit?slug=${ownerVendor?.slug}`)

    else
      history.push('/sellables/')

  }

  const _onRefreshListClick = e => {
    const currGoods = galleryState.goods.selected

    dispatch(GalleryVendorActions.getFromSlug_request({ slug: currGoods.goods_info?.owned_by?.slug }))
    dispatch(GalleryGoodsActions.getFromId_request({ id: query.get('id') }))
  }


  const _onSaveGoodsItemClick = e => {
    let tempGoods: IGoodsCreatePayload

    if (!iGoodsName) {
      dispatch(SysActions.process_error('ERROR: Goods name must NOT be empty.'))
      return
    }

    if (iCategories.length < 1) {
      dispatch(SysActions.process_error('ERROR: Please select the category first.'))
      return
    }

    if (!ownerVendor) {
      dispatch(SysActions.process_error('ERROR: Please select the owner vendor first.'))
      return
    }

    if (!isMediaGalleryReady) {
      dispatch(SysActions.process_error('You have upload queue, please resolve it first before saving.'))
      return
    }

    tempGoods = {
      ...tempGoods,
      main_label: iGoodsName,
      description: iGoodsDesc,
      price: iGoodsPrice.toString(),
      additional_info: iGoodsMoreInfo,
      category: iCategories[0],
      owned_by: ownerVendor,
      only_buy_with_packet: false,
      media: iMedia
    }

    if (editMode === 'create') {
      dispatch(SysActions.process_info('Creating goods item...'))

      dispatch(GalleryGoodsActions.createNew_request(tempGoods))
    }

    else if (editMode === 'edit') {

      dispatch(SysActions.process_info('Updating goods item...'))

      dispatch(GalleryGoodsActions.update_request({
        id: query.get('id'),
        payload_goods: tempGoods
      }))

    }

  }



  const _onGoodsDetailsChange = e => {
    switch (e.type) {
      case 'name': setIGoodsName(e.value); break;
      case 'desc': setIGoodsDesc(e.value); break;
      case 'price': setIGoodsPrice(e.value); break;
      case 'info': setIGoodsMoreInfo(e.value); break;
    }
  }




  return (
    <div className="goods-editor-page">
      <div className="command-bar">
        <div className="area-back-button">
          <AVButton size="conform" btnStyle="tertiary" onClick={_onNavBackClick}>
            <IconBack id="nav-back" />
          </AVButton>
        </div>
        <div className="area-title">
          <div className="tx page-subtitle">
            {editMode === 'create'
              && 'Creating new goods item'
              || `Editing: ${query.get('id')}`}
          </div>
          <div className="tx page-title">
            {editMode === 'create'
              ? 'Untitled item'
              : isLoading
                ? 'Loading...'
                : goodsItemSelected?.main_label}
          </div>
        </div>
        <div className="area-actions">
          <div className="bordered">
            <AVButton btnStyle="tertiary" onClick={_onRefreshListClick}>
              Reset
            </AVButton>
          </div>
          <div className="bordered">
            <AVButton btnStyle="tertiary" onClick={_onSaveGoodsItemClick}>
              Save item
            </AVButton>
          </div>
        </div>
      </div>

      <div className="content">

        <div className="area-details">
          <div className="goods-specific">
            <PanelGoodsItemEditDetailsView
              loadingMode={isLoading}
              goods_item={goodsItemSelected} 
              onDetailsChange={_onGoodsDetailsChange}/>
          </div>
          <div className="vendor-specific">
            <PanelOwnerVendorView
              loadingMode={isVendorLoading}
              onVendorChange={e => e.vendorSelected && setOwnerVendor(e.vendorSelected)}
              selected_vendor={ownerVendor || null} />
          </div>
        </div>

        <div className="area-additionals">

          <div className="tab-bar">
            <AVToggleButton
              onClick={() => setTabMode('categories')}
              checked={tabMode === 'categories'}>
              Category
            </AVToggleButton>
            <AVToggleButton
              onClick={() => setTabMode('gallery')}
              checked={tabMode === 'gallery'}>
              Gallery
            </AVToggleButton>
          </div>

          <div className="editor-area">
            <div style={{ display: tabMode !== 'categories' ? 'none' : '' }}>
              <PanelEditCategoriesView
                loadingMode={isLoading}
                multipleSelect={false}
                onCategoryChange={e => e.values && setICategories([{...e.values[0]}])}
                selectedCategory={goodsItemSelected?.category} />
            </div>
            <div style={{ display: tabMode !== 'gallery' ? 'none' : '' }}>
              <PanelGalleryMediaListView
                onNotifyUploadStateChange={e => setIsMediaGalleryReady(!e.queue)}
                onMediaChange={e => setIMedia(e.media)}
                current_media={goodsItemSelected && goodsItemSelected?.media && goodsItemSelected?.media || null}
                isLoading={isLoading}/>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}