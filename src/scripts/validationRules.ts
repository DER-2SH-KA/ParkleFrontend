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
