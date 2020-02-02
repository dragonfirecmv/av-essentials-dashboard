// #region Imports
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import './_packageEditor.scss'
import { AVButton, AVToggleButton } from '~/components/controls'

import { IAppState } from '~/core/redux'
import { IGalleryState, IMedia } from '~/core/redux/gallery'
// import { GalleryVendorActions, IVendorResponse } from '~/core/redux/gallery/vendors'
import { IconBack } from '~/components/gylph'
import { PanelGoodsItemEditDetailsView } from '~/components/views/panel/GoodsItemEditDetails/PanelGoodsItemEditDetailsView'
import { PanelEditCategoriesView, PanelGalleryMediaListView } from '~/components/views/panel'
import { PanelOwnerVendorView } from '~/components/views/panel/OwnerVendor/PanelOwnerVendorView'
import { IVendorResponse, GalleryVendorActions } from '~/core/redux/gallery/vendors'
import { ICategoryResponse } from '~/core/redux/gallery/categories'
import { SysActions } from '~/core/redux/sys'
import { GalleryPackageActions, IPackageCreatePayload, IPackageResponse } from '~/core/redux/gallery/packages'
import { PanelPackageItemEditDetailsView } from '~/components/views/panel/PackageItemEditDetails/PanelPackageItemEditDetailsView'
// import { PanelVendorEditDetailsView, PanelEditCategoriesView } from '~/components/views/panel'
// #endregion


export const PackageEditorPage = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)
  const query = new URLSearchParams(history.location.search)

  const [editMode, setEditMode] = useState('edit' as 'edit' | 'create')

  const [packageItemSelected, setPackageItemSelected] = useState(null as IPackageResponse)
  const [ownerVendor, setOwnerVendor] = useState(null as IVendorResponse)
  const [tabMode, setTabMode] = useState('categories' as 'categories' | 'sellables' | 'gallery')
  const [isVendorLoading, setIsVendorLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [iPkgName, setIPkgName] = useState('')
  const [iPkgDesc, setIPkgDesc] = useState('')
  const [iPkgPriceTotal, setIPkgPriceTotal] = useState(0)
  const [iPkgMinOrderDetails, setIPkgMinOrderDetails] = useState('')
  const [iPkgMinOrderPrice, setIPkgMinOrderPrice] = useState(0)

  const [iCategories, setICategories] = useState(null as ICategoryResponse[])
  const [iMedia, setIMedia] = useState(null as IMedia[])
  const [isMediaGalleryReady, setIsMediaGalleryReady] = useState(true)

  // Component initializationem
  useEffect(() => {

    dispatch(GalleryVendorActions.reset_selected())

    if (query.get('create') === 'new')
      setEditMode('create')

    else if (query.get('id'))
      dispatch(GalleryPackageActions.getFromId_request({ id: query.get('id') }))
  }, [])


  // EFFECT :: Package Selected
  useEffect(() => {
    const currPkg = galleryState.packages.selected

    setIsLoading(currPkg.meta.server_status === 'loading')

    if (editMode === 'edit') {
      if (currPkg.meta.server_status === 'finished') {
        setPackageItemSelected(currPkg.package)
        if (currPkg.meta.server_action === 'gallery-package-get_from_id') {
          setIPkgName(currPkg.package?.package_name)
          setIPkgDesc(currPkg.package?.description)
          setIPkgPriceTotal(parseInt(currPkg.package?.price_total))
          setIPkgMinOrderDetails(currPkg.package?.min_order_details)
          setIPkgMinOrderPrice(currPkg.package?.min_order_price)
          setICategories([...currPkg.package?.categories])

          if (currPkg.package?.vendor_owner?.id)
            dispatch(GalleryVendorActions.getFromSlug_request({ slug: currPkg.package?.vendor_owner?.slug }))
        }
      }
    }
    else if (editMode === 'create') {
      const vendor_from = query.get('from_vendor')

      if (vendor_from)
        dispatch(GalleryVendorActions.getFromSlug_request({ slug: vendor_from }))
    }


  }, [galleryState.packages.selected])

  // EFFECT :: Package Selected
  useEffect(() => {
    const currPkg = galleryState.packages.selected

    if (currPkg.meta.server_status === 'finished') {
      if (currPkg.meta.server_action === 'gallery-package-create_new') {
        dispatch(SysActions.process_error('Package item created.'))
        window.history.back()
        // history.push(`/sellables/edit-goods?id=${galleryState.goods.selected.goods_info?.id}`)
        // setEditMode('edit')
      }
      else if (currPkg.meta.server_action === 'gallery-package-update') {
        if (iCategories !== currPkg.package?.categories) {
          dispatch(SysActions.process_info('Updating package categories...'))
          dispatch(GalleryPackageActions.updateCategories_request({
            id: query.get('id'),
            update_categories: iCategories
          }))
        }
        else {
          dispatch(SysActions.process_error('Package succcessfully updated.'))
          window.location.href = (`/sellables/edit-packages?id=${query.get('id')}`)
        }
      }

      else if (currPkg.meta.server_action === 'gallery-package-update_categories') {
        dispatch(SysActions.process_error('Package succcessfully updated.'))
        window.location.href = (`/sellables/edit-packages?id=${query.get('id')}`)
      }
    }


    else if (currPkg.meta.server_status === 'error') {
      if (currPkg.meta.server_action === 'gallery-package-create_new') {
        dispatch(SysActions.process_error('Error while creating goods item. '))
      }
      else if (currPkg.meta.server_action === 'gallery-package-update') {
        dispatch(SysActions.process_error('Updating goods item ERROR.'))

      }
    }



  }, [galleryState.packages.selected])

  // EFFECT :: Goods and Vendor Selected !!
  useEffect(() => {

    const currPkg = galleryState.packages.selected
    const currVendor = galleryState.vendors.selected

    setIsVendorLoading(currVendor.meta.server_status === 'loading' || currPkg.meta.server_status === 'loading')

    if (currVendor.meta.server_status === 'finished')
      if (ownerVendor !== currVendor.vendor)
        setOwnerVendor(currVendor.vendor)

  }, [galleryState.packages.selected, galleryState.vendors.selected])


  const _onNavBackClick = e => {
    if (query.get('from_vendor') && ownerVendor.slug)
      window.location.href = (`/vendors/edit?slug=${ownerVendor?.slug}`)

    else
      history.push('/sellables/')

  }

  const _onRefreshListClick = e => {
    const currPkg = galleryState.packages.selected

    dispatch(GalleryVendorActions.getFromSlug_request({ slug: currPkg.package?.vendor_owner?.slug }))
    dispatch(GalleryPackageActions.getFromId_request({ id: query.get('id') }))
  }


  const _onSaveGoodsItemClick = e => {
    let tempGoods: IPackageCreatePayload

    if (!iPkgName) {
      dispatch(SysActions.process_error('ERROR: Package name must NOT be empty.'))
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
      package_name: iPkgName,
      description: iPkgDesc,
      price_total: iPkgPriceTotal.toString(),
      min_order_details: iPkgMinOrderDetails,
      min_order_price: iPkgMinOrderPrice,
      // categories: iCategories[0],
      vendor_owner: ownerVendor,
      // only_buy_with_packet: false,
      media: iMedia
    }

    if (editMode === 'create') {
      tempGoods = {
        ...tempGoods,
        categories: iCategories,
      }
      dispatch(SysActions.process_info('Creating new package...'))

      dispatch(GalleryPackageActions.createNew_request(tempGoods))
    }

    else if (editMode === 'edit') {

      dispatch(SysActions.process_info('Updating package...'))

      dispatch(GalleryPackageActions.update_request({
        id: query.get('id'),
        update_payload: tempGoods
      }))

    }

  }



  const _onGoodsDetailsChange = e => {
    switch (e.type) {
      case 'name': setIPkgName(e.value); break;
      case 'desc': setIPkgDesc(e.value); break;
      case 'price_total': setIPkgPriceTotal(e.value); break;
      case 'min_order_details': setIPkgMinOrderDetails(e.value); break;
      case 'min_order_price': setIPkgMinOrderPrice(e.value); break;
    }
  }




  return (
    <div className="package-editor-page">
      <div className="command-bar">
        <div className="area-back-button">
          <AVButton size="conform" btnStyle="tertiary" onClick={_onNavBackClick}>
            <IconBack id="nav-back" />
          </AVButton>
        </div>
        <div className="area-title">
          <div className="tx page-subtitle">
            {editMode === 'create'
              && 'Creating new package item'
              || `Editing: ${query.get('id')}`}
          </div>
          <div className="tx page-title">
            {editMode === 'create'
              ? 'Untitled item'
              : isLoading
                ? 'Loading...'
                : packageItemSelected?.package_name}
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
            <PanelPackageItemEditDetailsView
              loadingMode={isLoading}
              package_item={packageItemSelected}
              onDetailsChange={_onGoodsDetailsChange} />
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
                multipleSelect={true}
                onCategoryChange={e => e.values && setICategories([...e.values])}
                selectedCategories={packageItemSelected?.categories} />
            </div>
            <div style={{ display: tabMode !== 'gallery' ? 'none' : '' }}>
              <PanelGalleryMediaListView
                onNotifyUploadStateChange={e => setIsMediaGalleryReady(!e.queue)}
                onMediaChange={e => setIMedia(e.media)}
                current_media={packageItemSelected && packageItemSelected?.media && packageItemSelected?.media || null}
                isLoading={isLoading} />
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}