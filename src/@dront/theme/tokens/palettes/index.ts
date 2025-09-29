import type { ThemeOptions } from '@mui/material';
import themeTokenPaletteCommonLight from './partials/common/light';

const themeTokenPalette = (): ThemeOptions['palette'] => {
  return themeTokenPaletteCommonLight;
};

export default themeTokenPalette;
