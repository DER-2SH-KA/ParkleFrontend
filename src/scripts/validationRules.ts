export const loginRules = [
  (value: string) => {
    if (!!value.trim()) return true

    return 'Логин не должен быть пустым!'
  },
  (value: string) => {
    const len = value.trim().length

    if (len > 2 && len < 51) return true

    return 'Длина логина от 3 до 50 символов!'
  },
  (value: string) => {
    const regexLogin: RegExp = new RegExp('^[a-zA-Z0-9_-]{3,50}$')
    const login = value.trim()

    if (regexLogin.test(login)) return true

    return 'Логин может содержать только латинские символы, _, - и цифры!'
  },
]

export const passwordRules = [
  (value: string) => {
    if (!!value.trim()) return true

    return 'Пароль не должен быть пустым!'
  },
  (value: string) => {
    const len = value.trim().length

    if (len > 7 && len < 73) return true

    return 'Длина пароля от 8 до 72 символов!'
  },
  (value: string) => {
    const regexPassword1: RegExp = new RegExp('^[a-zA-Z0-9`=!@#$%^&*()_+№;:?\\-\\\\/|]{8,72}$')
    const password2 = value.trim()

    if (regexPassword1.test(password2)) return true

    return 'Разрешены только: a-z, A-Z, 0-9, `=!@#$%^&*()_+№;:?\-\\/|!'
  },
]
