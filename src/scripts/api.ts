import axios, { type AxiosRequestConfig } from 'axios'
import type {
  UserAuthDto,
  UserCreateDto,
  UserResponseDto,
  WebsiteCreateDto,
  WebsiteResponseDto,
  WebsiteUpdateDto,
} from './declaration'

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true

const authLoginApi = '/auth/login'
const registrationApi = '/auth/registration'
// const userUpdateApi = '/auth/update'
const userDeleteApi = '/auth/delete'
const userLogoutApi = '/auth/logout'
const userPingApi = '/auth/ping'

const isAuthedApi = '/auth/isAuthed'

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

/// User CRUD.

export const isAuthedRequest = async (): Promise<UserResponseDto | undefined> => {
  let isAuthorizedUser: UserResponseDto | undefined = undefined

  await doGet(isAuthedApi)
    .then((response) => {
      isAuthorizedUser = response.data
      console.info("isAuthedRequest 'then' response =>", response)
    })
    .catch((err) => {
      console.error('isAuthedRequest error => ', err)
    })

  return isAuthorizedUser
}

export const logout = async (): Promise<undefined> => {
  await doGet(userLogoutApi).catch((err) => {
    console.error('logout error => ', err)
  })
}

export const ping = async (): Promise<undefined> => {
  return await doGet(userPingApi)
}

/** Sign In User. POST.
 * @param {UserAuthDto} userAuthDto user DTO for login.
 * @returns {UserResponseDto} created User DTO.
 */
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

/** Sign Up User. POST.
 * @param {UserCreateDto} userCreateDto user DTO for registration.
 * @returns {UserResponseDto} created User DTO.
 */
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

/** Delete user's account. DELETE.
 * @param {string} userId user's ID.
 * @returns {UserResponseDto} deleted User DTO.
 */
export const deleteAccount = async (
  login: string | undefined,
): Promise<UserResponseDto | undefined> => {
  let result: UserResponseDto | undefined = undefined

  if (login !== undefined) {
    await doDelete(userDeleteApi + `/${login}`)
      .then((response) => {
        console.info("User's account was deleted", response)
        result = response
      })
      .catch((error) => {
        console.error("User's accoune was't deleted", error)
      })
  } else {
    console.info('User is not authorized')
    return undefined
  }

  console.info('User account DTO', result)
  return result
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
