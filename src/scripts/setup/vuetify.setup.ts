import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import {
  mdiAccount,
  mdiAt,
  mdiBrush,
  mdiCheck,
  mdiCog,
  mdiDelete,
  mdiEye,
  mdiEyeOff,
  mdiMagnify,
  mdiPencil,
  mdiText,
  mdiTextLong,
  mdiThemeLightDark,
  mdiWeb,
} from '@mdi/js'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { ru } from 'vuetify/locale'
import customThemes from '@/scripts/setup/vuetify.themes.setup'

export const configuredVuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      account: mdiAccount,
      brush: mdiBrush,
      cog: mdiCog,
      check: mdiCheck,
      delete: mdiDelete,
      emailAt: mdiAt,
      eye: mdiEye,
      eyeClosed: mdiEyeOff,
      magnify: mdiMagnify,
      pencil: mdiPencil,
      text: mdiText,
      textLong: mdiTextLong,
      themeLightDark: mdiThemeLightDark,
      web: mdiWeb,
    },
    sets: {
      mdi,
    },
  },
  components,
  directives,
  theme: customThemes,
  locale: {
    locale: 'ru',
    fallback: 'en',
    messages: {
      ru,
    },
  },
})
