import { doGet, doPost, doPatch, doDelete, proccessError } from './api'
import type {
  WebsiteTagCreateDto,
  WebsiteTagResponseDto,
  WebsiteTagUpdateDto,
  ErrorResponseDto,
} from '../declaration'
import { isWebsiteTagResponseDto, isErrorResponseDto } from '@/scripts/typeGuards'

const websiteTagApi = '/websites/tags'
const websiteTagUserTagsApi = websiteTagApi + '/me'
const websiteTagNewApi = websiteTagApi + '/new'
const websiteTagUpdateApi = websiteTagApi + '/update'
const websiteTagDeleteApi = websiteTagApi + '/delete'

/// Website tags CRUD.

export const getUsersWebsiteTags = async (): Promise<WebsiteTagResponseDto[]> => {
  let responseData: WebsiteTagResponseDto[] | ErrorResponseDto = []

  return await doGet(websiteTagUserTagsApi)
    .then((result): WebsiteTagResponseDto[] => {
      responseData = result.data

      console.info(`Get user's website tags dtoes: `, responseData)

      return result.data
    })
    .catch((err) => {
      responseData = proccessError(err)

      console.error(`Get user's website tags error: `, err)

      return []
    })
}

export const createWebsiteTag = async (
  newWebsiteTagDto: WebsiteTagCreateDto,
): Promise<WebsiteTagResponseDto | ErrorResponseDto> => {
  let responseData: WebsiteTagResponseDto | ErrorResponseDto = {
    messageForClient: 'Я тело пустышки из createWebsiteTag',
    messageForDev: 'I am an empty object of createWebsiteTag function',
  }

  await doPost(websiteTagNewApi, newWebsiteTagDto)
    .then((response) => {
      responseData = getWebsiteTagDtoOrErrorDto(response)

      if (isWebsiteTagResponseDto(responseData)) {
        console.info('Create website tag by Id dto: ', responseData)
      } else {
        console.error('Create website tag by Id error dto: ', response)
      }
    })
    .catch((err) => {
      responseData = proccessError(err)

      console.error('Create website tag error', err)
    })

  return responseData
}

export const updateWebsiteTagById = async (
  websiteTagId: string,
  newWebsiteTagDto: WebsiteTagUpdateDto,
): Promise<WebsiteTagResponseDto | ErrorResponseDto> => {
  let responseData: WebsiteTagResponseDto | ErrorResponseDto = {
    messageForClient: 'Я тело пустышки из updateWebsiteTagById',
    messageForDev: 'I am an empty object of updateWebsiteTagById function',
  }

  await doPatch(websiteTagUpdateApi, newWebsiteTagDto)
    .then((response) => {
      responseData = getWebsiteTagDtoOrErrorDto(response)

      if (isWebsiteTagResponseDto(responseData)) {
        console.info('Update website tag by Id dto: ', responseData)
      } else {
        console.error('Update website tag by Id error dto: ', response)
      }
    })
    .catch((err) => {
      responseData = proccessError(err)

      console.error('Update website tag by Id error: ', err)
    })

  return responseData
}

export const deleteWebsiteTag = async (
  websiteTagId: string,
): Promise<WebsiteTagResponseDto | ErrorResponseDto> => {
  let responseData: WebsiteTagResponseDto | ErrorResponseDto = {
    messageForClient: 'Я тело пустышки из deleteWebsiteTag',
    messageForDev: 'I am an empty object of deleteWebsiteTag function',
  }

  await doDelete(websiteTagDeleteApi + `/${websiteTagId}`)
    .then((response) => {
      responseData = getWebsiteTagDtoOrErrorDto(response)

      console.info('Delete website tag by Id dto: ', responseData)
    })
    .catch((err) => {
      responseData = proccessError(err)

      console.error('Delete website tag by Id error: ', err)
    })

  return responseData
}

// Disable eslint for any.
// eslint-disable-next-line
function getWebsiteTagDtoOrErrorDto(response: any): WebsiteTagResponseDto | ErrorResponseDto {
  let responseData: WebsiteTagResponseDto | ErrorResponseDto = {
    messageForClient: 'Сервер успешно обработал запрос, но ответ в неверном формате',
    messageForDev:
      'Request success, has response, it has body, but is not requested body interface',
  }

  if (isWebsiteTagResponseDto(response.data) || isErrorResponseDto(response.data)) {
    responseData = response.data
  }

  return responseData
}
