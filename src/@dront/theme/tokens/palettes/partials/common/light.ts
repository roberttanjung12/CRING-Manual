import type { ThemeOptions } from '@mui/material';

const themeTokenPaletteCommonLight: ThemeOptions['palette'] = {
  mode: 'light',
  primary: {
    main: '#681399',
    light: '#C6D1F2',
    dark: 'linear-gradient(184.46deg, #3B80E6 -31.81%, #6B0C94 63.31%)',
    contrastText: '#fff'
  },
  secondary: {
    main: '#F04F47',
    dark: '#d32f2f',
    contrastText: '#C62525'
  },
  success: {
    main: '#11C15B',
    light: '#D9F5E5',
    contrastText: '#167E3C'
  },
  warning: {
    main: '#F5C108',
    light: '#FFECDC',
    dark: '#dbad0a'
  },
  info: {
    main: '#14348F',
    light: '#7712A3',
    contrastText: '#1A338C'
  },
  grey: {
    '100': '#656262',
    '200': '#F0F3F7',
    '300': '#8F8F8F',
    '400': '#EFEFEF',
    '900': '#000000',
    A100: '#1A1818',
    A200: '#363333',
    A400: '#0C0B0B',
    A700: '#333333'
  },
  divider: 'rgba(224, 224, 224, 1)',
  background: {
    paper: '#FFFFFF',
    default: '#f0f3f7'
  },
  text: {
    primary: 'rgb(17, 24, 39)',
    secondary: 'rgb(107, 114, 128)',
    disabled: 'rgb(149, 156, 169)'
  },
  common: {
    black: 'rgb(17, 24, 39)',
    white: '#FFFFFF'
  }
};

export default themeTokenPaletteCommonLight;
