import type {
  ErrorResponseDto,
  RoleResponseDto,
  UserResponseDto,
  WebsiteResponseDto,
} from './declaration'

export function isErrorResponseDto(obj: unknown): obj is ErrorResponseDto {
  return (
    !!obj &&
    typeof obj === 'object' &&
    'messageForClient' in obj &&
    'messageForDev' in obj &&
    typeof obj.messageForClient === 'string' &&
    typeof obj.messageForDev === 'string'
  )
}

export function isUserResponseDto(obj: unknown): obj is UserResponseDto {
  const result =
    !!obj &&
    typeof obj === 'object' &&
    'id' in obj &&
    'roleName' in obj &&
    'rolePriority' in obj &&
    'login' in obj &&
    'email' in obj &&
    typeof obj.id === 'string' &&
    typeof obj.roleName === 'string' &&
    typeof obj.rolePriority === 'number' &&
    typeof obj.login === 'string' &&
    typeof obj.email === 'string'

  return result
}

export function isRoleResponseDto(obj: unknown): obj is RoleResponseDto {
  const result =
    !!obj &&
    typeof obj === 'object' &&
    'name' in obj &&
    'priority' in obj &&
    typeof obj.name === 'string' &&
    typeof obj.priority === 'number'

  return result
}

export function isWebsiteResponseDto(obj: unknown): obj is WebsiteResponseDto {
  const result =
    !!obj &&
    typeof obj === 'object' &&
    'id' in obj &&
    'userLogin' in obj &&
    'hexColor' in obj &&
    'title' in obj &&
    'description' in obj &&
    'url' in obj &&
    typeof obj.id === 'string' &&
    typeof obj.userLogin === 'string' &&
    typeof obj.hexColor === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.url === 'string'

  return result
}
