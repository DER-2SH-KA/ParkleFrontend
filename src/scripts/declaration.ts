export interface IEntity {
  id: string
}

/**
 * DTO for role.
 */
export interface RoleResponseDto {
  name: string
  priority: number
}

/**
 * DTO for authentication.
 */
export interface UserAuthDto {
  login: string
  password: string
}

/**
 * DTO for create User.
 */
export interface UserCreateDto {
  roleName: string
  login: string
  email: string
  password: string
}

/**
 * DTO for update User.
 *  */
export interface UserUpdateDto extends IEntity {
  roleName: string
  login: string
  email: string
  password: string
}

/**
 * DTO for give user from server.
 */
export interface UserResponseDto extends IEntity {
  roleName: string
  rolePriority: number
  login: string
  email: string
}

/**
 * DTO for create new website.
 */
export interface WebsiteCreateDto {
  userLogin: string
  hexColor: string
  title: string
  description?: string | undefined
  url: string
}

/**
 * DTO for update website.
 */
export interface WebsiteUpdateDto extends IEntity {
  userLogin: string
  title: string
  description?: string | undefined
  hexColor: string
  url: string
}

/**
 * DTO for give website from server.
 */
export interface WebsiteResponseDto extends IEntity {
  userLogin: string
  hexColor: string
  title: string
  description?: string | undefined
  url: string
}

/**
 * DTO for errors.
 */
export interface ErrorResponseDto {
  messageForClient: string
  messageForDev: string
}
