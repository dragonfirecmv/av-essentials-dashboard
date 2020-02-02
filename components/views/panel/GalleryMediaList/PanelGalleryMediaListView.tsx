// #region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'

import './_galleryMediaList.scss'

import { IAppState } from '~/core/redux'
import { CommonPlaceholderVendor } from '~/static/img'
import { AVChip, AVButton, AVAccordion } from '~/components/controls'
import { IconEdit, IconDelete } from '~/components/gylph'
import { IMedia } from '~/core/redux/gallery'
import { BaseServerStatus } from '~/core/libs/types/global-status.type'
import { createBase64fromBlob, createBlobFromImage } from '~/core/libs/tools/image-tools'
import { IToolsImageEditorState, ToolsImageEditorActions } from '~/core/redux/tools/imageEditor'
import { SysActions } from '~/core/redux/sys'
import { asyncForEach } from '~/core/libs/tools/function-helper'
import { uploadImageToServer } from '~/core/libs/services/file-upload'
// #endregion


export const PanelGalleryMediaListView = (props: IProps) => {

  const dispatch = useDispatch()
  const appState = useSelector<IAppState, IAppState>(state => state)

  const [isLoading, setIsLoading] = useState(false)
  const [mediaList, setMediaList] = useState([] as IMedia[])
  const [mediaReqDeleteList, setMediaReqDeleteList] = useState([] as IMedia[])
  const [imageCandidateList, setImageCandidateList] = useState([] as { id: number, filename: string, base64: string }[])

  useEffect(() => {
    setIsLoading(props.isLoading)

    if (!props.isLoading) {
      const tempMedia = 
        typeof props.current_media === 'object'
        && Array.isArray(props.current_media)
        && props.current_media || []

      setMediaList([...tempMedia])
    }

  }, [props.isLoading, props.current_media])

  useEffect(() => {
    props.onMediaChange && props.onMediaChange({ media: mediaList })
  }, [mediaList])

  useEffect(() => {
    props.onNotifyUploadStateChange
    && props.onNotifyUploadStateChange({ queue: imageCandidateList.length > 0 ? true : false })
  }, [imageCandidateList])

  const _onPicItemClick = e => {
    const tempPic = e.meta as IMedia

    switch (e.type) {
      case 'delete':
        setMediaList([...mediaList?.filter(pic_item => pic_item.url !== tempPic.url)])
        setMediaReqDeleteList([...mediaReqDeleteList, tempPic])
        break

      case 'restore':
        setMediaReqDeleteList([...mediaReqDeleteList?.filter(pic_item => pic_item.url !== tempPic.url)])
        setMediaList([...mediaList, tempPic])
        break
    }

    props.onMediaChange && props.onMediaChange({ media: mediaList })
  }

  const _onSelectFileClick = e => {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('accept', '.jpg,.jpeg,.png');
    fileSelector.onchange = (e) => {
      const tempFiles = (e.target as HTMLInputElement).files

      console.log('uploading', tempFiles)

      if (tempFiles[0].size > 2000000)
        alert('File should not exceed 2MB!')

      else {
        createBase64fromBlob(
          tempFiles[0],
          base64 => {
            setImageCandidateList([...imageCandidateList, {
              id: Math.floor((Math.random() * 1000)),
              base64: base64.toString(),
              filename: tempFiles[0].name
            }])
          })
        
      }
    }
    if (imageCandidateList.length >= 5) {
      dispatch(SysActions.process_error('ERROR: Maximum 5 image per uploads queue allowed.'))
    }
    else {
      fileSelector.click()
    }
  }


  const _onUploadImagesClick = async () => {
    console.log(imageCandidateList)
    let tempMediaList = [] as IMedia[]

    await asyncForEach<{ id: number, filename: string, base64: string }>(imageCandidateList, async (per_img, idx) => {
      dispatch(SysActions.process_info(`Uploading ${idx + 1} of ${imageCandidateList.length}: ${per_img.filename}`))
      const processBlob = await createBlobFromImage(per_img.base64)
      const imageUpload = await uploadImageToServer(processBlob, per_img.filename.replace(/[^a-z0-9]/gi, '-'), appState.auth.credentials.token_access)
      console.log(processBlob)
      tempMediaList = [...tempMediaList, { url: imageUpload.publicUrl }]
    })

    setMediaList([...mediaList, ...tempMediaList])

    dispatch(SysActions.process_error('Finished uploading image.'))
    setImageCandidateList([])

    props.onMediaChange && props.onMediaChange({ media: mediaList })
  }


  const _renderContent = () => (
    <F>
      <div className="accordion-enclosure">
        <AVAccordion mainTitle="Upload new picture(s) - MAX 5 per uploads">
          <div className="enclosure-upload">

            <div className="enclosing-action">
              <AVButton onClick={e => _onSelectFileClick(e)}>Select picture</AVButton>
              {
                imageCandidateList.length > 0 && (
                  <AVButton btnStyle="secondary" onClick={() => _onUploadImagesClick()}>
                    Upload selected
                  </AVButton>
                )
              }
            </div>

            {
              imageCandidateList?.map((imageToBeUploaded) => (
                <div className="enclosure-file-candidate">
                  <div className="column img">
                    <div className="enclosure-img">
                      <img src={imageToBeUploaded.base64} alt="" />
                    </div>
                  </div>
                  <div className="column info">
                    <div className="tx filename">{imageToBeUploaded.filename}</div>
                  </div>
                  <div className="column action">
                    <AVButton btnStyle="tertiary" onClick={() => setImageCandidateList(imageCandidateList.filter(img => img.id !== imageToBeUploaded.id))}>
                      <IconDelete id="delete-img" />
                    </AVButton>
                  </div>
                </div>
              ))
            }

          </div>
        </AVAccordion>
      </div>





      <div className="accordion-enclosure">
        <AVAccordion mainTitle="Gallery">
          <div className="area-list-existing">
            {
              mediaList && mediaList.length > 0
              && (<div className="tx info-title">Gallery's pictures. To request deletion, simply click on the picture.</div>)
              || (<div className="tx info-subtitle">No picture available. Start uploading!</div>)
            }
            <div className="area-enclosing-gallery">
              {
                mediaList?.map(pictureItem => (
                  <div className="enclosure">
                    <div className="enclosing-picture" onClick={e => _onPicItemClick({ e, meta: pictureItem, type: 'delete' })}>
                      <img src={pictureItem.url} alt="" />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className="area-to-be-deleted">
            {
              mediaReqDeleteList && mediaReqDeleteList.length > 0 &&
              <div className="tx info-title">List to be deleted. To restore, click on the desired picture.</div>
            }
            <div className="area-enclosing-gallery">
              {
                mediaReqDeleteList?.map(pictureItem => (
                  <div className="enclosure">
                    <div className="enclosing-picture" onClick={e => _onPicItemClick({ e, meta: pictureItem, type: 'restore' })}>
                      <img class="grayscale" src={pictureItem.url} alt="" />
                    </div>
                  </div>
                ))
              }
            </div>

          </div>
        </AVAccordion>
      </div>

    </F>
  )

  const _renderPlaceholder = () => (
    <div className="area-placeholder">
      <div className="tx loading-text">Loading...</div>
    </div>
  )


  return (
    <div class={`view-panel-gallery-media-list`}>

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
  isLoading?: boolean
  current_media: IMedia[]

  onMediaChange?: any
  onNotifyUploadStateChange?: any
}

export interface IGoodsListTableItemClickEvent {
  e: MouseEvent,
  meta: IMedia[]
}
//#endregion


// event propagate, tell if it's:
// not uploaded yet
// uploaded
// only moving stuff