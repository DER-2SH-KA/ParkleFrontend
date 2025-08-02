import axios, { type AxiosRequestConfig } from 'axios'
import type {
  UserAuthDto,
  UserCreateDto,
  UserResponseDto,
  WebsiteCreateDto,
  WebsiteResponseDto,
  WebsiteUpdateDto,
} from './declaration'

const websitesApi = '/api/websites'

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL
axios.defaults.timeout = 10000

const authLoginApi = '/api/auth/login'
const registrationApi = '/api/auth/registration'

/// Website CRUD.
// Get webstites from all users.
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

// Get websites by user ID.
export const getWebsitesByUserId = async (userId: string): Promise<WebsiteResponseDto[]> => {
  let websiteRepsponseDtos: WebsiteResponseDto[] = []

  await doGet(websitesApi + `/user/${userId}`)
    .then((result) => {
      websiteRepsponseDtos = result.data
    })
    .catch((error) => {
      console.error('getAllWebsites', error)
    })

  console.info(websiteRepsponseDtos)
  return websiteRepsponseDtos ?? undefined
}

// Create website.
export const createWebsite = async (
  newWebsiteDto: WebsiteCreateDto,
): Promise<WebsiteResponseDto | undefined> => {
  let websiteResponseDto: WebsiteResponseDto | undefined = undefined

  await doPost(websitesApi + '/new', newWebsiteDto)
    .then((result) => {
      websiteResponseDto = result.data
    })
    .catch((error) => {
      console.error('updateWebsiteById', error)
    })

  return websiteResponseDto ?? undefined
}

// Update website by DTO.
export const updateWebsiteById = async (
  websiteId: string,
  newWebsiteDto: WebsiteUpdateDto,
): Promise<WebsiteResponseDto | undefined> => {
  let websiteResponseDto: WebsiteResponseDto | undefined = undefined

  await doPut(websitesApi + `/${websiteId}`, newWebsiteDto)
    .then((result) => {
      websiteResponseDto = result
    })
    .catch((error) => {
      console.error('updateWebsiteById', error)
    })

  return websiteResponseDto ?? undefined
}

// Delete website.
export const deleteWebsite = async (websiteId: string): Promise<WebsiteResponseDto | undefined> => {
  let websiteResponseDto: WebsiteResponseDto | undefined = undefined

  await doDelete(websitesApi + `/${websiteId}`)
    .then((result) => {
      websiteResponseDto = result
    })
    .catch((error) => {
      console.error('updateWebsiteById', error)
    })

  return websiteResponseDto ?? undefined
}

/// User CRUD.
// Sign In User.
export const authorize = async (userAuthDto: UserAuthDto): Promise<UserResponseDto | undefined> => {
  let authorizedUser: UserResponseDto | undefined = undefined

  await doPost(authLoginApi, userAuthDto)
    .then((result) => {
      authorizedUser = result.data
    })
    .catch((error) => {
      console.error('authorizeUser', error)
    })

  console.info('Authroized User Response DTO: ', authorizedUser)
  return authorizedUser ?? undefined
}

// Sign Up User.
export const registration = async (
  userCreateDto: UserCreateDto,
): Promise<UserResponseDto | undefined> => {
  let createdUser: UserResponseDto | undefined = undefined

  await doPost(registrationApi, userCreateDto)
    .then((result) => {
      createdUser = result.data
    })
    .catch((error) => {
      console.error('authorizeUser', error)
    })

  console.info('Created User Response DTO:', createdUser)
  return createdUser ?? undefined
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
export const doDelete = async (url: string): Promise<any> => {
  return await axios.delete(url)
}
