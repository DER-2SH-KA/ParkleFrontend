import { doGet, doPost, doPatch, doDelete, proccessError } from './api'
import type {
  WebsiteTagCreateDto,
  WebsiteTagResponseDto,
  WebsiteTagUpdateDto,
  ErrorResponseDto,
} from '../declaration'
import { isErrorResponseDto } from '@/scripts/typeGuards'

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
