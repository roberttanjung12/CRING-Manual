import type { ThemeOptions } from '@mui/material';

const themeTokenTypography: ThemeOptions['typography'] = {
  fontFamily: 'ProximaNova, Roboto, Arial, sans-serif',
  fontSize: 14,
  h1: {
    fontSize: 22,
    fontWeight: 600
  },
  h2: {
    fontSize: 20,
    fontWeight: 500
  },
  h3: {
    fontSize: 18,
    fontWeight: 500
  },
  h4: {
    fontSize: 16,
    fontWeight: 500
  },
  h5: {
    fontSize: 14,
    fontWeight: 500
  },
  h6: {
    fontSize: 12,
    fontWeight: 500
  },
  subtitle1: {
    fontSize: 14
  },
  subtitle2: {
    fontSize: 16
  },
  body1: {
    fontSize: 14
  },
  body2: {
    fontSize: 12
  },
  // Custom variants untuk mengganti custom CSS classes
  button: {
    fontFamily: 'ProximaNova, Roboto, Arial, sans-serif',
    textTransform: 'none',
    fontWeight: 500
  },
  caption: {
    fontSize: 12,
    lineHeight: 1.4
  }
};

export default themeTokenTypography;
