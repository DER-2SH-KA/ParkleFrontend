import { type ThemeDefinition } from 'vuetify'
import type { ThemeOptions } from 'vuetify/lib/composables/theme.mjs'

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#F8F7FA',
    surface: '#FFFFFF',
    primary: '#6F00FF',
    secondary: '#7C4DFF',
    success: '#16A34A',
    warning: '#D97706',
    error: '#DC2626',
    info: '#0284C7',
  },
}

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#0F0D14',
    surface: '#18151F',
    primary: '#6F00FF',
    secondary: '#9B6DFF',
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#38BDF8',
  },
}

const customThemes: ThemeOptions = {
  transition: {
    origin: '100% 0%',
  },
  defaultTheme: 'system',
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
}

export default customThemes
