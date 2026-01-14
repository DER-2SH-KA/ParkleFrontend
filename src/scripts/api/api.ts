import axios, { type AxiosRequestConfig } from 'axios'
import type {
  ErrorResponseDto,
  WebsiteCreateDto,
  WebsiteResponseDto,
  WebsiteUpdateDto,
} from '../declaration'
import { isErrorResponseDto } from '../checkObjectsByStructure'

const websitesApi = '/websites'
const websiteNewApi = '/websites/new'
const websiteUpdateApi = '/websites/update'
const websiteDeleteApi = '/websites/delete'

// TODO: DELETE FROM PRODUCTION VERSION. ONLY FOR TESTS!
/// Website CRUD.
/** Get webstites from all users.
 * @returns {WebsiteResponseDto[]} List of Websites.
 */
export const getAllWebsites = async (): Promise<WebsiteResponseDto[]> => {
  let websiteRepsponseDtos: WebsiteResponseDto[] = []

  await doGet(websitesApi)
    .then((result) => {
      websiteRepsponseDtos = result.data
    })
    .catch((error) => {
      console.error('getAllWebsites', error)
    })

  console.info(websiteRepsponseDtos)
  return websiteRepsponseDtos ?? undefined
}

/** Get websites by user ID.
 * @param {string} userId User ID.
 * @returns {WebsiteResponseDto[]} List of user's Websites.
 */
export const getWebsitesByUserId = async (userId: string): Promise<WebsiteResponseDto[]> => {
  let websiteRepsponseDtos: WebsiteResponseDto[] = []

  await doGet(websitesApi + `/user/${userId}`)
    .then((result) => {
      websiteRepsponseDtos = result.data
    })
    .catch((error) => {
      console.error('getWebsitesByUserId: ', error)
    })

  console.info(websiteRepsponseDtos)
  return websiteRepsponseDtos ?? undefined
}

/**
 * Get websites by user login.
 * @param {string} userLogin User login.
 * @returns {WebsiteResponseDto[]} List of user's websites.
 */
export const getWebsitesByUserLogin = async (userLogin: string): Promise<WebsiteResponseDto[]> => {
  let websiteResponseDtos: WebsiteResponseDto[] = []

  await doGet(websitesApi + `/user/${userLogin}`)
    .then((result) => {
      websiteResponseDtos = result.data
    })
    .catch((error) => {
      console.error('getWebsitesByUserLogin: ', error)
    })

  console.info(websiteResponseDtos)
  return websiteResponseDtos ?? undefined
}

/** Create website.
 * @param {WebsiteCreateDto} newWebsiteDto DTO for create new website.
 * @returns {WebsiteResponseDto} DTO of created website.
 */
export const createWebsite = async (
  newWebsiteDto: WebsiteCreateDto,
): Promise<WebsiteResponseDto | undefined> => {
  let websiteResponseDto: WebsiteResponseDto | undefined = undefined

  await doPost(websiteNewApi, newWebsiteDto)
    .then((result) => {
      websiteResponseDto = result.data
    })
    .catch((error) => {
      console.error('updateWebsiteById', error)
    })

  return websiteResponseDto ?? undefined
}

/** Update website by DTO..
 * @param {string} websiteId website ID which update.
 * @param {WebsiteUpdateDto} newWebsiteDto DTO with new information for update.
 * @returns {WebsiteResponseDto} Updated User DTO.
 */
export const updateWebsiteById = async (
  websiteId: string,
  newWebsiteDto: WebsiteUpdateDto,
): Promise<WebsiteResponseDto | undefined> => {
  let websiteResponseDto: WebsiteResponseDto | undefined = undefined

  await doPatch(websiteUpdateApi + `/${websiteId}`, newWebsiteDto)
    .then((result) => {
      websiteResponseDto = result
    })
    .catch((error) => {
      console.error('updateWebsiteById', error)
    })

  return websiteResponseDto ?? undefined
}

/** Delete website.
 * @param {string} websiteId website ID which delete.
 */
export const deleteWebsite = async (websiteId: string): Promise<WebsiteResponseDto | undefined> => {
  let websiteResponseDto: WebsiteResponseDto | undefined = undefined

  await doDelete(websiteDeleteApi + `/${websiteId}`)
    .then((result) => {
      websiteResponseDto = result
    })
    .catch((error) => {
      console.error('updateWebsiteById', error)
    })

  return websiteResponseDto ?? undefined
}

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
