import axios, { type AxiosRequestConfig } from 'axios'
import type { UserAuthDto, UserCreateDto, UserResponseDto, WebsiteResponseDto } from './declaration'

const websitesApi = '/api/websites'

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.timeout = 10000

const authLoginApi = '/api/auth/login'
const registrationApi = '/api/auth/registration'

export const getAllWebsites = async (): Promise<WebsiteResponseDto[] | undefined> => {
  let websiteRepsponseDtos: WebsiteResponseDto[] | undefined = []

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

export const getWebsitesByUserId = async (
  userId: string,
): Promise<WebsiteResponseDto[] | undefined> => {
  let websiteRepsponseDtos: WebsiteResponseDto[] | undefined = []

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

/* eslint-disable @typescript-eslint/no-explicit-any */
export const authorize = async (
  userAuthDto: UserAuthDto,
): Promise<UserResponseDto | undefined> => {
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
export const doGet = async (url: string, config?: AxiosRequestConfig): Promise<any> => {
  return await axios.get(url, config)
}

export const doPost = async (url: string, object: any): Promise<any> => {
  return await axios.post(url, object)
}
