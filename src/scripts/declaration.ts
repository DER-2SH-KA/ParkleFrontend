export interface IEntity {
  id: string
}

/**
 * DTO for role.
 */
export interface RoleDto extends IEntity {
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
export interface UserUpdateDto {
  roleId: string
  login: string
  email: string
  password: string
}

/**
 * DTO for give user from server.
 */
export interface UserResponseDto extends IEntity {
  role: RoleDto
  login: string
  email: string
}

/**
 * DTO for create new website.
 */
export interface WebsiteCreateDto {
  userId: string
  hexColor: string
  title: string
  description?: string | undefined
  url: string
}

/**
 * DTO for update website.
 */
export interface WebsiteUpdateDto {
  userId: string
  title: string
  description?: string | undefined
  hexColor: string
  url: string
}

/**
 * DTO for give website from server.
 */
export interface WebsiteResponseDto extends IEntity {
  userId: string
  hexColor: string
  title: string
  description?: string | undefined
  url: string
}
