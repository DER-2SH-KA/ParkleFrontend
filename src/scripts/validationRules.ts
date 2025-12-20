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

export const emailRules = [
  (value: string) => {
    if (!!value.trim()) return true

    return 'Адрес эл. почты обязателен!'
  },
  (value: string) => {
    const regexEmail: RegExp = new RegExp('^(\\S+@\\S+\\.\\S+)$')
    const emailInputValue = value.trim()

    if (regexEmail.test(emailInputValue)) return true

    return 'Неверный формат электронной почты!'
  },
  (value: string) => {
    if (value.trim().length <= 320) return true

    return 'Почта должна быть до 320 символов!'
  },
]
