export function isErrorResponseDto(obj: unknown): boolean {
  const result =
    !!obj && typeof obj.messageForClient === 'string' && typeof obj.messageForDev === 'string'

  return result
}

export function isUserResponseDto(obj: unknown): boolean {
  const result =
    !!obj &&
    typeof obj.id === 'string' &&
    typeof obj.roleName === 'string' &&
    typeof obj.rolePriority === 'number' &&
    typeof obj.login === 'string' &&
    typeof obj.email === 'string'

  return result
}

export function isRoleResponseDto(obj: unknown): boolean {
  const result = !!obj && typeof obj.name === 'string' && typeof obj.priority === 'number'

  return result
}

export function isWebsiteResponseDto(obj: unknown): boolean {
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
