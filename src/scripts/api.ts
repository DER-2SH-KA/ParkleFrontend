import axios from 'axios'
import type { UserAuthDto, UserCreateDto } from './declaration'

const websitesApi = '/api/websites'

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.timeout = 10000

const authLoginApi = '/api/auth/login'
const registrationApi = '/api/auth/registration'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAllWebsites = async (): Promise<any> => {
  const websiteRepsponseDtos = await axios.get(websitesApi)

  console.info(websiteRepsponseDtos)
  return websiteRepsponseDtos.data ?? null
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const authorizeUser = async (userAuthDto: UserAuthDto): Promise<any> => {
  const authorizedUser = await axios.post(authLoginApi, userAuthDto)

  console.info('Authroized User Response DTO: ', authorizedUser.data)
  return authorizedUser.data ?? null
}

export const postCreateUser = async (userCreateDto: UserCreateDto): Promise<any> => {
  const createdUser = await axios.post(registrationApi, userCreateDto)

  console.info('Created User Response DTO:', createdUser.data)
  return createdUser.data ?? null
}
