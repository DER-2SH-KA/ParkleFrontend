import type {
  ErrorResponseDto,
  RoleResponseDto,
  UserResponseDto,
  WebsiteResponseDto,
  WebsiteDataResponseDto,
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
    'login' in obj &&
    'roles' in obj &&
    typeof obj.id === 'string' &&
    typeof obj.login === 'string' &&
    typeof obj.roles === 'object'

  return result
}

export function isRoleResponseDto(obj: unknown): obj is RoleResponseDto {
  const result =
    !!obj &&
    typeof obj === 'object' &&
    'id' in obj &&
    'name' in obj &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string'

  return result
}

export function isWebsiteResponseDto(obj: unknown): obj is WebsiteResponseDto {
  const result =
    !!obj &&
    typeof obj === 'object' &&
    'id' in obj &&
    'title' in obj &&
    'description' in obj &&
    'url' in obj &&
    'hexColor' in obj &&
    'tags' in obj &&
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.url === 'string' &&
    typeof obj.hexColor === 'string' &&
    typeof obj.tags === 'object'

  return result
}

export function isWebsiteDataResponseDto(obj: unknown): obj is WebsiteDataResponseDto {
  const result =
    !!obj &&
    typeof obj === 'object' &&
    'title' in obj &&
    'description' in obj &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string'

  return result
}

export function isWebsiteTagResponseDto(obj: unknown): obj is WebsiteResponseDto {
  const result =
    !!obj &&
    typeof obj === 'object' &&
    'id' in obj &&
    'title' in obj &&
    'hex' in obj &&
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.hex === 'string'

  return result
}
