import type {
  ErrorResponseDto,
  RoleResponseDto,
  UserResponseDto,
  WebsiteResponseDto,
} from './declaration'

export function isErrorResponseDto(obj: unknown): obj is ErrorResponseDto {
  return !!obj && typeof obj.messageForClient === 'string' && typeof obj.messageForDev === 'string'
}

export function isUserResponseDto(obj: unknown): obj is UserResponseDto {
  const result =
    !!obj &&
    typeof obj.id === 'string' &&
    typeof obj.roleName === 'string' &&
    typeof obj.rolePriority === 'number' &&
    typeof obj.login === 'string' &&
    typeof obj.email === 'string'

  return result
}

export function isRoleResponseDto(obj: unknown): obj is RoleResponseDto {
  const result = !!obj && typeof obj.name === 'string' && typeof obj.priority === 'number'

  return result
}

export function isWebsiteResponseDto(obj: unknown): obj is WebsiteResponseDto {
  const result =
    !!obj &&
    typeof obj.id === 'string' &&
    typeof obj.userLogin === 'string' &&
    typeof obj.hexColor === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.url === 'string'

  return result
}
