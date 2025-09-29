import { type PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import themeTokenComponents from './tokens/components';
import themeTokenPalette from './tokens/palettes';
import themeTokenTypography from './tokens/typography';

const theme = (mode: PaletteMode) =>
  createTheme({
    direction: 'ltr',
    palette: {
      mode,
      divider: 'rgba(224, 224, 224, 1)',
      ...themeTokenPalette()
    },
    spacing: 4,
    shape: { borderRadius: 8 },
    typography: themeTokenTypography,
    components: themeTokenComponents
  });

export default theme;
