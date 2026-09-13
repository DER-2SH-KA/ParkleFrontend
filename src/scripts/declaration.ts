export interface IEntity {
  id: string
}

// Role.
export interface RoleResponseDto {
  id: string
  name: string
}

export interface RoleCreateDto {
  name: string
}

export interface RoleUpdateDto {
  id: string
  name: string
}

// User.
export interface UserResponseDto extends IEntity {
  id: string
  login: string
  roles: Set<RoleResponseDto>
}

export interface UserAuthDto {
  login: string
  password: string
}

export interface UserCreateDto {
  login: string
  password: string
  roles: Set<RoleResponseDto>
}

export interface UserUpdateDto extends IEntity {
  id: string
  login: string // Don't update in database and system. It's normal.
  password: string
  roles: Set<RoleResponseDto>
}

// Website.
export interface WebsiteResponseDto extends IEntity {
  id: string
  title: string
  description?: string | undefined
  url: string
  hexColor: string
  tags: Set<WebsiteTagResponseDto>
}

export interface WebsiteCreateDto {
  userLogin: string
  title: string
  description?: string | undefined
  url: string
  hexColor: string
  tags: Set<WebsiteTagResponseDto>
}

export interface WebsiteUpdateDto extends IEntity {
  id: string
  title: string
  description?: string | undefined
  hexColor: string
  url: string
  tags: Set<WebsiteTagResponseDto>
}

// Website Tag.
export interface WebsiteTagResponseDto {
  id: string
  title: string
  hex: string
}

export interface WebsiteTagCreateDto {
  userId: string
  title: string
  hex: string
}

export interface WebsiteTagUpdateDto {
  id: string
  title: string
  hex: string
}

// Website Data.
export interface WebsiteDataResponseDto {
  title: string
  description?: string
}

/**
 * DTO for errors.
 */
export interface ErrorResponseDto {
  messageForClient: string
  messageForDev: string
}
