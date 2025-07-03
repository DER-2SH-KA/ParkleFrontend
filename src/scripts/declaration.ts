export interface IEntity {
  id: number
}

export interface Role extends IEntity {
  name: string
  priority: number
}

export interface User extends IEntity {
  role_id: number
  login: string
  email: string
}

export interface Website extends IEntity {
  user_id: number
  hex: string
  title: string
  description?: string | undefined
  url: string
}
