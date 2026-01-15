import axios, { type AxiosRequestConfig } from 'axios'
import type { ErrorResponseDto } from '../declaration'
import { isErrorResponseDto } from '../typeGuards'

// CRUD functions.
/* eslint-disable @typescript-eslint/no-explicit-any */
export const doGet = async (url: string, config?: AxiosRequestConfig): Promise<any> => {
  return await axios.get(url, config)
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const doPost = async (url: string, object: any): Promise<any> => {
  return await axios.post(url, object)
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const doPut = async (url: string, object: any): Promise<any> => {
  return await axios.put(url, object)
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const doPatch = async (url: string, object: any): Promise<any> => {
  return await axios.patch(url, object)
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const doDelete = async (url: string): Promise<any> => {
  return await axios.delete(url)
}

export function proccessError(err: any): ErrorResponseDto {
  const errResponseDto: ErrorResponseDto = {
    messageForClient: 'Неизвестная ошибка',
    messageForDev: 'Undefined error',
  }

  if (axios.isAxiosError(err)) {
    const request = err.request
    const response = err.response

    // Have response.
    if (!!response) {
      if (isErrorResponseDto(response.data)) {
        errResponseDto.messageForClient =
          response.data.messageForClient ?? 'Тело ошибки от сервера пустое'
        errResponseDto.messageForDev =
          response.data.messageForDev ?? 'Body of error from server is empty'
      }
    }
    // Haven't response but have request.
    else if (!!request) {
      errResponseDto.messageForClient = 'Сервер не отвечает...'
      errResponseDto.messageForDev = "Request is sended, but server don't give response"
    }
  }

  return errResponseDto
}
