import { doGet, doPost, doDelete, proccessError } from './api'
import {
  type UserAuthDto,
  type UserCreateDto,
  type UserResponseDto,
  type ErrorResponseDto,
} from '@/scripts/declaration'
import { isUserResponseDto } from '@/scripts/typeGuards'

const authLoginApi = '/auth/login'
const registrationApi = '/auth/registration'
// const userUpdateApi = '/auth/update'
const userDeleteApi = '/auth/delete'
const userLogoutApi = '/auth/logout'
const userPingApi = '/auth/ping'

const isAuthedApi = '/auth/isAuthed'

/// User CRUD.
// To check is user authed in system.
export const isAuthed = async (): Promise<UserResponseDto | ErrorResponseDto> => {
  let responseData: UserResponseDto | ErrorResponseDto = {
    messageForClient: 'Я тело пустышки из isAuthed',
    messageForDev: 'I am an empty object of isAuthed function',
  }

  await doGet(isAuthedApi)
    .then((response) => {
      responseData = getUserDtoOrErrorDto(response)

      console.info('isAuthed dto body', responseData)
    })
    .catch((err) => {
      responseData = proccessError(err)

      console.info('isAuthed error', err)
    })

  return responseData
}

/**
 * Logout user from system on server.
 */
export const logout = async (): Promise<undefined> => {
  await doGet(userLogoutApi).catch((err) => {
    console.error('logout method error => ', err)
  })
}

/**
 * Check is server can accept requests.
 */
export const ping = async (): Promise<undefined> => {
  return await doGet(userPingApi)
}

/** Sign In User.
 * @param {UserAuthDto} userAuthDto user DTO for login.
 * @returns {UserResponseDto} created User DTO.
 */
export const authorize = async (
  userAuthDto: UserAuthDto,
): Promise<UserResponseDto | ErrorResponseDto> => {
  let responseData: UserResponseDto | ErrorResponseDto = {
    messageForClient: 'Я тело пустышки из метода авторизации',
    messageForDev: 'I am an empty object of authorize function',
  }

  await doPost(authLoginApi, userAuthDto)
    .then((response) => {
      responseData = getUserDtoOrErrorDto(response)

      console.info('Authorized dto body', responseData)
    })
    .catch((err) => {
      responseData = proccessError(err)

      console.error('Authorization error', err)
    })

  return responseData
}

/** Sign Up User.
 * @param {UserCreateDto} userCreateDto user DTO for registration.
 * @returns {UserResponseDto} created User DTO.
 */
export const registration = async (
  userCreateDto: UserCreateDto,
): Promise<UserResponseDto | ErrorResponseDto> => {
  let responseData: UserResponseDto | ErrorResponseDto = {
    messageForClient: 'Я тело пустышки из метода регистрации',
    messageForDev: 'I am an empty object of registration function',
  }

  await doPost(registrationApi, userCreateDto)
    .then((response) => {
      responseData = getUserDtoOrErrorDto(response)

      console.info('Registration dto body', responseData)
    })
    .catch((err) => {
      responseData = proccessError(err)

      console.error('Registration error', err)
    })

  return responseData
}

/** Delete user's account. DELETE.
 * @param {string} userId user's ID.
 * @returns {UserResponseDto} deleted User DTO.
 */
export const deleteAccount = async (
  login: string | undefined,
): Promise<UserResponseDto | ErrorResponseDto> => {
  let responseData: UserResponseDto | ErrorResponseDto = {
    messageForClient: 'Я тело пустышки из метода удаления пользователя',
    messageForDev: 'I am an empty object of deleteAccount function',
  }

  if (login !== undefined) {
    await doDelete(userDeleteApi + `/${login}`)
      .then((response) => {
        responseData = getUserDtoOrErrorDto(response)

        console.info('DeleteAccount dto body', responseData)
      })
      .catch((err) => {
        responseData = proccessError(err)

        console.error('DeleteAccount error', err)
      })
  } else {
    responseData = {
      messageForClient: 'Не указан логин аккаунта для удаления',
      messageForDev: 'Login for delete is undefined',
    }

    console.info('Login for delete account is undefined')
  }

  return responseData
}

// Disable eslint for any.
// eslint-disable-next-line
function getUserDtoOrErrorDto(response: any): UserResponseDto | ErrorResponseDto {
  let responseData: UserResponseDto | ErrorResponseDto = {
    messageForClient: 'Сервер успешно обработал запрос, но ответ в неверном формате',
    messageForDev:
      'Request success, has response, it has body, but is not requested body interface',
  }

  if (isUserResponseDto(response.data)) {
    responseData = response.data

    console.info('isAuthed dto body', response.data)
  }

  return responseData
}
