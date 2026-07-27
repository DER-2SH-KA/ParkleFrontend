import 'vuetify/styles'
import * as components from 'vuetify/components'
import { createVuetify } from 'vuetify'
import * as directives from 'vuetify/directives'
import {
  mdiAccount,
  mdiAt,
  mdiBrush,
  mdiCog,
  mdiDelete,
  mdiEye,
  mdiEyeOff,
  mdiMagnify,
  mdiPencil,
  mdiText,
  mdiTextLong,
  mdiWeb,
} from '@mdi/js'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { ru } from 'vuetify/locale'

export const configuredVuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      account: mdiAccount,
      brush: mdiBrush,
      cog: mdiCog,
      delete: mdiDelete,
      email_at: mdiAt,
      eye: mdiEye,
      eye_closed: mdiEyeOff,
      magnify: mdiMagnify,
      pencil: mdiPencil,
      text: mdiText,
      text_long: mdiTextLong,
      web: mdiWeb,
    },
    sets: {
      mdi,
    },
  },
  components,
  directives,
  locale: {
    locale: 'ru',
    fallback: 'en',
    messages: {
      ru,
    },
  },
})
