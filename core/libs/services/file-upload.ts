import { API_BUCKET } from '../constants'

export async function uploadImageToServer(blob: Blob, filename: string, token: string): Promise<IUploadImageResponse> {

  let formData = new FormData()
  formData.append("file", blob, `${filename}.jpg`)

  let response = await fetch(API_BUCKET(), {
    method: 'POST',
    body: formData,
    headers: { 'Authorization': `Bearer ${token}` }
  });

  let result = await response.json();
  return result
 
}

export interface IUploadImageResponse {
  filename: string
  publicUrl: string
}