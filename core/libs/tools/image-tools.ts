import { Area } from "react-easy-crop"

const createImageFromURL = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })



function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180
}


export const createBlobFromImage = async (base64: string) =>
  await (await fetch(base64)).blob()


export const createBase64fromBlob = (blob: Blob, callback: (base64: string | ArrayBuffer) => any) => {
  const reader = new FileReader();

  reader.onloadend = function (): any {
    const base64data = reader.result;
    callback(base64data)
  }
  reader.readAsDataURL(blob);
}


export const getCroppedImage = async (imageSrc: string, pixelCrop: Area, rotation = 0) => {
  
  const image = await createImageFromURL(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const safeArea = Math.max(image.width, image.height) * 2
  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea
  canvas.height = safeArea

  // fill the background with white to remove alpha channel
  ctx.fillStyle = '#fff';  /// set white fill style
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2)
  ctx.rotate(getRadianAngle(rotation))
  ctx.translate(-safeArea / 2, -safeArea / 2)

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  )
  const data = ctx.getImageData(0, 0, safeArea, safeArea)

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
    0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
  )
  // As Base64 string
  return canvas.toDataURL('image/jpeg');

}