// #region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import './_vendorEditor.scss'
import { AVButton, AVToggleButton, AVAccordion } from '~/components/controls'

import { IAppState } from '~/core/redux'
import { IGalleryState, IMedia } from '~/core/redux/gallery'
import { GalleryVendorActions, IVendorResponse, IVendorCategoriesPayload, IVendorCategory } from '~/core/redux/gallery/vendors'
import { IconBack } from '~/components/gylph'
import { PanelVendorEditDetailsView, PanelEditCategoriesView, PanelVendorGoodsEditView, PanelVendorPackageEditView } from '~/components/views/panel'
import { ToolsImageEditorActions } from '~/core/redux/tools/imageEditor'
import { SysActions } from '~/core/redux/sys'
import { uploadImageToServer, IUploadImageResponse } from '~/core/libs/services/file-upload'
import { IToolsState } from '~/core/redux/tools'
import { createBlobFromImage } from '~/core/libs/tools/image-tools'
import { IGoodsListTableItemClickEvent } from '~/components/views/tables'
import { PanelGalleryMediaListView } from '~/components/views/panel'
// #endregion


export const VendorEditorPage = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)
  const appState = useSelector<IAppState, IAppState>(state => state)
  const query = new URLSearchParams(history.location.search)

  const [vendorSelected, setVendorSelected] = useState(null as IVendorResponse)
  const [tabMode, setTabMode] = useState('categories' as 'categories' | 'sellables' | 'gallery')
  const [editMode, setEditMode] = useState('edit' as 'edit' | 'create')

  const [isLoading, setIsLoading] = useState(false)
  const [isMediaGalleryReady, setIsMediaGalleryReady] = useState(true)

  const [tVendorName, setTVendorName] = useState('')
  const [tVendorAddr, setTVendorAddr] = useState('')
  const [tVendorDesc, settVendorDesc] = useState('')
  const [tVendorEmail, setTVendorEmail] = useState('')
  const [tVendorContact, setTVendorContact] = useState('')
  const [iMediaGallery, setIMediaGallery] = useState(null as IMedia[])

  const [tVCategs, setTVCategs] = useState([] as IVendorCategory[])

  useEffect(() => {
    dispatch(ToolsImageEditorActions.new())

    if (query.get('create') === 'new')
      setEditMode('create')

    else if (query.get('slug'))
      dispatch(GalleryVendorActions.getFromSlug_request({ slug: query.get('slug') }))
  }, [])

  useEffect(() => {
    const status = galleryState.vendors.selected.meta.server_status
    setIsLoading(status === 'loading')

    console.log({ status })

    if (status === 'finished') {
      setVendorSelected(galleryState.vendors.selected.vendor)
      setTVendorName(galleryState.vendors.selected.vendor?.vendor_name)
      setTVendorAddr(galleryState.vendors.selected.vendor?.vendor_addess)
      settVendorDesc(galleryState.vendors.selected.vendor?.vendor_description)
      setTVendorEmail(galleryState.vendors.selected.vendor?.vendor_email)
      setTVendorContact(galleryState.vendors.selected.vendor?.vendor_contacts)
      setTVCategs(galleryState.vendors.selected.vendor?.vendor_categories)
      setIMediaGallery(galleryState.vendors.selected.vendor?.media)
    }

    if (galleryState.vendors.selected.meta.server_action === 'gallery-vendor-create_new') {
      if (status === 'finished') {
        dispatch(SysActions.process_error('Vendor is created!'))
        history.push(`/vendors/edit?slug=${galleryState.vendors.selected.vendor?.slug}`)
        setEditMode('edit')
      }

      if (status === 'error')
        dispatch(SysActions.process_error('Error occured when creating vendor.'))
    }

    if (galleryState.vendors.selected.meta.server_action === 'gallery-vendor-update') {
      dispatch(SysActions.process_info('Updating vendor categories...'))
      dispatch(GalleryVendorActions.updateCategories_request({ payload_category: tVCategs, vendor_slug: query.get('slug') }))

      // if (tVCategs !== vendorSelected?.vendor_categories) {
      //   dispatch(SysActions.process_info('Updating vendor categories...'))
      //   dispatch(GalleryVendorActions.updateCategories_request({ payload_category: tVCategs, vendor_slug: query.get('slug')  }))

      //   if (status === 'finished') {
      //     dispatch(SysActions.process_error('Vendor and its categories is updated!'))
      //     window.location.href = (`/vendors/edit?slug=${query.get('slug')}`)
      //   }

      //   if (status === 'error')
      //     dispatch(SysActions.process_error('Error occured when updating vendor and its categories.'))
      // }
      // else {
      //   if (status === 'finished') {
      //     dispatch(SysActions.process_error('Vendor is updated!'))
      //     // window.location.href = (`/vendors/edit?slug=${query.get('slug')}`)
      //   }

      //   if (status === 'error')
      //     dispatch(SysActions.process_error('Error occured when updating vendor.'))
      // }
    }

    if (galleryState.vendors.selected.meta.server_action === 'gallery-vendor-update_categories') {
      if (status === 'finished') {
        dispatch(SysActions.process_error('Vendor and its categories is updated!'))
        window.location.href = (`/vendors/edit?slug=${query.get('slug')}`)
      }

      if (status === 'error')
        dispatch(SysActions.process_error('Error occured when updating vendor and its categories.'))
    }

  }, [galleryState.vendors.selected])



  const _onNavBackClick = e => {
    history.push('/vendors/')
  }

  const _onRefreshListClick = e => {
    dispatch(GalleryVendorActions.getFromSlug_request({ slug: query.get('slug') }))
    dispatch(ToolsImageEditorActions.new())
  }

  const _onVendorChange = e => {
    switch (e.type) {
      case 'name': setTVendorName(e.value); break;
      case 'address': setTVendorAddr(e.value); break;
      case 'email': setTVendorEmail(e.value); break;
      case 'desc': settVendorDesc(e.value); break;
      case 'contact': setTVendorContact(e.value); break;
    }
  }

  const _onCreateVendorClick = async (e) => {

    if (!tVendorName) {
      dispatch(SysActions.process_error('ERROR: Vendor name must NOT be empty.'))
      return
    }

    if (!appState.tools.image_editor.processed_data) {
      dispatch(SysActions.process_error('ERROR: Please upload your vendor logo.'))
      return
    }

    if (tVCategs.length < 1) {
      dispatch(SysActions.process_error('ERROR: Please select the categories first.'))
      return
    }

    if (!isMediaGalleryReady) {
      dispatch(SysActions.process_error('You have upload queue, please resolve it first before saving.'))
      return
    }

    dispatch(SysActions.process_info('Uploading image...'))
    const processBlob = await createBlobFromImage(appState.tools.image_editor.processed_data)
    const imageUpload = await uploadImageToServer(processBlob, tVendorName.replace(/[^a-z0-9]/gi, ''), appState.auth.credentials.token_access)

    console.log(imageUpload)

    dispatch(GalleryVendorActions.createNew_request({
      vendor_name: tVendorName,
      vendor_description: tVendorDesc,
      vendor_categories: tVCategs,
      vendor_addess: tVendorAddr,
      vendor_contacts: tVendorContact,
      vendor_email: tVendorEmail,
      vendor_currency_code: 'IDR',
      vendor_localization_code: 'id-ID',
      vendor_logo_url: {
        url: imageUpload.publicUrl
      },
      media: iMediaGallery
    }))

  }



  const _onSaveVendorClick = async (e) => {

    let imageUpload: IUploadImageResponse
    let tempPayload

    if (!tVendorName) {
      dispatch(SysActions.process_error('ERROR: Vendor name must NOT be empty.'))
      return
    }

    if (tVCategs.length < 1) {
      dispatch(SysActions.process_error('ERROR: Please select the categories first.'))
      return
    }

    if (!isMediaGalleryReady) {
      dispatch(SysActions.process_error('You have upload queue, please resolve it first before saving.'))
      return
    }

    if (appState.tools.image_editor.processed_data) {
      dispatch(SysActions.process_info('Uploading image...'))

      const processBlob = await createBlobFromImage(appState.tools.image_editor.processed_data)
      imageUpload = await uploadImageToServer(processBlob, tVendorName.replace(/[^a-z0-9]/gi, ''), appState.auth.credentials.token_access)

      tempPayload = {
        ...tempPayload,
        vendor_logo_url: {
          url: imageUpload.publicUrl
        }
      }
    }

    dispatch(SysActions.process_info('Updating vendor...'))

    tempPayload = {
      ...tempPayload,
      vendor_name: tVendorName,
      vendor_description: tVendorDesc,
      vendor_addess: tVendorAddr,
      vendor_contacts: tVendorContact,
      vendor_email: tVendorEmail,
      vendor_currency_code: 'IDR',
      vendor_localization_code: 'id-ID',
      media: iMediaGallery
    }

    dispatch(GalleryVendorActions.update_request({
      vendor_update: tempPayload,
      slug: query.get('slug')
    }))

  }

  const _onCreateItemClick = (e, type: 'goods' | 'packages') => {
    history.push(`/sellables/edit-${type}?create=new&from_vendor=${vendorSelected?.slug}`)
  }


  return (
    <div className="vendor-editor-page">
      <div className="command-bar">
        <div className="area-back-button">
          <AVButton size="conform" btnStyle="tertiary" onClick={_onNavBackClick}>
            <IconBack id="nav-back" />
          </AVButton>
        </div>
        <div className="area-title">
          <div className="tx page-subtitle">
            {editMode === 'create'
              && 'Creating new vendor'
              || `Editing: ${query.get('slug')}`}
          </div>
          <div className="tx page-title">
            {editMode === 'create'
              ? 'Untitled vendor'
              : isLoading
                ? 'Loading...'
                : vendorSelected?.vendor_name}
          </div>
        </div>
        <div className="area-actions">
          {
            editMode === 'edit'
              ? (
                <div className="bordered">
                  <AVButton btnStyle="tertiary" onClick={_onRefreshListClick}>
                    Reset
                  </AVButton>
                </div>
              )
              : (<F />)
          }
          <div className="bordered">
            <AVButton btnStyle="tertiary" onClick={editMode === 'create' ? _onCreateVendorClick : _onSaveVendorClick}>
              {editMode === 'edit' ? 'Save' : 'Create'} vendor
            </AVButton>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="area-details">
          <PanelVendorEditDetailsView
            loadingMode={isLoading}
            onVendorChange={_onVendorChange}
            vendor_data={vendorSelected} />
        </div>
        <div className="area-additionals">

          <div className="tab-bar">
            <AVToggleButton
              onClick={() => setTabMode('categories')}
              checked={tabMode === 'categories'}>
              Categories
            </AVToggleButton>
            <AVToggleButton
              onClick={() => setTabMode('sellables')}
              checked={tabMode === 'sellables'}>
              Sellables
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
                onCategoryChange={e => setTVCategs(e.values)}
                //@ts-ignore
                selectedCategories={vendorSelected?.vendor_categories} />
            </div>
            <div style={{ display: tabMode !== 'sellables' ? 'none' : '' }}>
              {
                editMode === 'create'
                  ? (
                    <div className="area-sellables">
                      <div className="tx">Please create the vendor first.</div>
                    </div>
                  )
                  : (
                    <div className="area-sellables">
                      <div className="enclosure-sellables act">
                        <div className="action-enclosing">
                          <AVButton btnStyle="secondary" onClick={e => _onCreateItemClick(e, 'goods')}>
                            Create new Goods item
                          </AVButton>
                        </div>
                        <div className="action-enclosing">
                          <AVButton btnStyle="secondary" onClick={e => _onCreateItemClick(e, 'packages')}>
                            Create new Package item
                          </AVButton>
                        </div>
                      </div>
                      <div className="enclosure-sellables">
                        <AVAccordion mainTitle="Goods">
                          <PanelVendorGoodsEditView
                            vendor_slug={query.get('slug')}
                            loadingMode={isLoading}
                            goods_data={vendorSelected?.goods_items} />
                        </AVAccordion>
                      </div>
                      <div className="enclosure-sellables">
                        <AVAccordion mainTitle="Packages">
                          <PanelVendorPackageEditView
                            vendor_slug={query.get('slug')}
                            loadingMode={isLoading}
                            packages_data={vendorSelected?.packages_to_sell} />

                          {/* <PanelVendorGoodsEditView
                      loadingMode={isLoading}
                      vendor_data={vendorSelected?.goods_items} /> */}
                        </AVAccordion>
                      </div>
                    </div>
                  )
              }
            </div>

            <div style={{ display: tabMode !== 'gallery' ? 'none' : '' }}>
              <PanelGalleryMediaListView
                onNotifyUploadStateChange={e => setIsMediaGalleryReady(!e.queue)}
                onMediaChange={e => setIMediaGallery(e.media)}
                current_media={vendorSelected && vendorSelected?.media && vendorSelected?.media || null}
                isLoading={isLoading} />
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}