//#region Imports
import { h } from 'preact'
import { useState, useCallback } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux'
import { default as Cropper } from 'react-easy-crop'
import { getCroppedImage, createBase64fromBlob } from '~/core/libs/tools/image-tools'

import './_imageEditor.scss'
import { AVButton, AVSlider } from '~/components/controls'

import { IAppState } from '~/core/redux'
import { SysActions } from '~/core/redux/sys'
import { IToolsImageEditorState, ToolsImageEditorActions } from '~/core/redux/tools/imageEditor'
//#endregion


export const ModalImageEditorView = () => {

  const dispatch = useDispatch()
  const toolsImageEditorState = useSelector<IAppState, IToolsImageEditorState>(state => state.tools.image_editor)

  const [isLoading, setIsLoading] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const _onCloseClick = () => dispatch(SysActions.modal_close())

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])
  
  const _onUploadImageClick = e => {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('accept', '.jpg,.jpeg,.png');
    fileSelector.onchange = (e) => {
      const tempFiles = (e.target as HTMLInputElement).files

      console.log('uploading', tempFiles)

      if (tempFiles[0].size > 2000000)
        alert('File should not exceed 2MB!')

      else {
        setZoom(1)
        createBase64fromBlob(
          tempFiles[0], 
          base64 => 
          dispatch(ToolsImageEditorActions.setRaw(base64.toString())))
      }
    }
    fileSelector.click()
  }

  const _onSaveImageClick = useCallback(async () => {
    console.log('processing')
    try {
      setIsLoading(true)
      const croppedImage = await getCroppedImage(toolsImageEditorState.raw_data, croppedAreaPixels)
      setIsLoading(false)
      // dispatch(ToolsActions.new())
      dispatch(ToolsImageEditorActions.setProcessed(croppedImage))
      dispatch(SysActions.modal_close())
    }
    catch (ex) {
      setIsLoading(false)
      console.log(ex)
    }
  }, [croppedAreaPixels])

  return (
    <div className="view-modal-image-editor">

      <div class="command-bar">
        <div class="area-left">
          <div class="div-btn" onClick={_onCloseClick}>
            <div class="tx misc noselect">
              &times;
            </div>
          </div>
        </div>
        {
          toolsImageEditorState.raw_data
            ? (<div class="area-right">
                <AVButton onClick={_onUploadImageClick} btnStyle="tertiary">
                  Upload new picture
                  </AVButton>
                <AVButton onClick={_onSaveImageClick} loadingMode={isLoading}>
                  Save changes
                  </AVButton>
              </div>)
            : (<div />)
        }
      </div>

      <div class="crop-container">
        {
          toolsImageEditorState.raw_data
            ? (<Cropper
                image={toolsImageEditorState.raw_data}
                crop={crop}
                zoom={zoom}
                aspect={toolsImageEditorState.aspect_ratio}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={zoom => setZoom(zoom)}
              />)
            : (<div class="container-info">
                <div class="tx info">Please upload image to crop.</div>
                <AVButton onClick={_onUploadImageClick}>
                  Upload image
                  </AVButton>
              </div>)
        }
      </div>
      <div class="app-bar">
        {
          toolsImageEditorState.raw_data
            ? (<AVSlider
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={value => setZoom(value)} />)
              : <div />
        }
      </div>
    </div>
  )
}
