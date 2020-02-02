import { default as Axios, ResponseType as RT, Method} from 'axios'


export interface IResponse<T> {
  meta: {
    ok: boolean
    headers?: any
    status?: number
    status_text?: string
    error?: any
  }
  payload?: T
}

export const restRequest = async <T>(url: string, method: Method = 'POST', body?: object, headers?: object, responseType: RT = 'json'): Promise<IResponse<T>> => {

  let tempResponse: IResponse<T>
 
  try {
    const response = await Axios({
      method,
      headers: {
        ...headers,
        Accept: 'application/json'
      },
      url,
      responseType,
      data: body,
      timeout: 15000
    })
    
    tempResponse = {
      payload: response.data,
      meta: {
        ok: true,
        headers: response.headers,
        status: response.status,
        status_text: response.statusText
      }
    }
  }

  catch (error) {
    tempResponse.meta = {
      ok: false,
      error
    }
  }

  finally {
    return tempResponse
  }

}