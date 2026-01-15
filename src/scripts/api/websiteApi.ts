import { doGet, doPost, doPatch, doDelete, proccessError } from './api'
import type {
  WebsiteCreateDto,
  WebsiteResponseDto,
  WebsiteUpdateDto,
  ErrorResponseDto,
} from '../declaration'
import { isWebsiteResponseDto } from '@/scripts/typeGuards'

const websitesApi = '/websites'
const websiteNewApi = websitesApi + '/new'
const websiteUpdateApi = websitesApi + '/update'
const websiteDeleteApi = websitesApi + '/delete'

/// Website CRUD.

/**
 * Get websites by user login.
 * @param {string} userLogin User login.
 * @returns {WebsiteResponseDto[]} List of user's websites.
 */
export const getWebsitesByUserLogin = async (
  userLogin: string,
): Promise<WebsiteResponseDto[] | ErrorResponseDto> => {
  let responseData: WebsiteResponseDto[] | ErrorResponseDto = []

  await doGet(websitesApi + `/me`)
    .then((result) => {
      responseData = result.data

      console.info(`Get website by ${userLogin} dtoes: `, responseData)
    })
    .catch((err) => {
      responseData = proccessError(err)

      console.error('Get website by login error: ', err)
    })

  return responseData
}

/** Create website.
 * @param {WebsiteCreateDto} newWebsiteDto DTO for create new website.
 * @returns {WebsiteResponseDto} DTO of created website.
 */
export const createWebsite = async (
  newWebsiteDto: WebsiteCreateDto,
): Promise<WebsiteResponseDto | ErrorResponseDto> => {
  let responseData: WebsiteResponseDto | ErrorResponseDto = {
    messageForClient: 'Я тело пустышки из createWebsite',
    messageForDev: 'I am an empty object of createWebsite function',
  }

  await doPost(websiteNewApi, newWebsiteDto)
    .then((response) => {
      responseData = getWebsiteDtoOrErrorDto(response)

      if (isWebsiteResponseDto(responseData)) {
        console.info('Create website by Id dto: ', responseData)
      } else {
        console.error('Create website by Id error dto: ', response)
      }
    })
    .catch((err) => {
      responseData = proccessError(err)

      console.error('Create website error', err)
    })

  return responseData
}

/** Update website by DTO..
 * @param {string} websiteId website ID which update.
 * @param {WebsiteUpdateDto} newWebsiteDto DTO with new information for update.
 * @returns {WebsiteResponseDto} Updated User DTO.
 */
export const updateWebsiteById = async (
  websiteId: string,
  newWebsiteDto: WebsiteUpdateDto,
): Promise<WebsiteResponseDto | ErrorResponseDto> => {
  let responseData: WebsiteResponseDto | ErrorResponseDto = {
    messageForClient: 'Я тело пустышки из updateWebsiteById',
    messageForDev: 'I am an empty object of updateWebsiteById function',
  }

  await doPatch(websiteUpdateApi + `/${websiteId}`, newWebsiteDto)
    .then((response) => {
      responseData = getWebsiteDtoOrErrorDto(response)

      if (isWebsiteResponseDto(responseData)) {
        console.info('Update website by Id dto: ', responseData)
      } else {
        console.error('Update website by Id error dto: ', response)
      }
    })
    .catch((err) => {
      responseData = proccessError(err)

      console.error('Update website by Id error: ', err)
    })

  return responseData
}

/** Delete website.
 * @param {string} websiteId website ID which delete.
 */
export const deleteWebsite = async (
  websiteId: string,
): Promise<WebsiteResponseDto | ErrorResponseDto> => {
  let responseData: WebsiteResponseDto | ErrorResponseDto = {
    messageForClient: 'Я тело пустышки из deleteWebsite',
    messageForDev: 'I am an empty object of deleteWebsite function',
  }

  await doDelete(websiteDeleteApi + `/${websiteId}`)
    .then((response) => {
      responseData = getWebsiteDtoOrErrorDto(response)

      console.info('Delete website by Id dto: ', responseData)
    })
    .catch((err) => {
      responseData = proccessError(err)

      console.error('Delete website by Id error: ', err)
    })

  return responseData
}

// Disable eslint for any.
// eslint-disable-next-line
function getWebsiteDtoOrErrorDto(response: any): WebsiteResponseDto | ErrorResponseDto {
  let responseData: WebsiteResponseDto | ErrorResponseDto = {
    messageForClient: 'Сервер успешно обработал запрос, но ответ в неверном формате',
    messageForDev:
      'Request success, has response, it has body, but is not requested body interface',
  }

  if (isWebsiteResponseDto(response.data)) {
    responseData = response.data

    console.info('isAuthed dto body', response.data)
  }

  return responseData
}
