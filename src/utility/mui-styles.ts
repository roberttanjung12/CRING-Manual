/**
 * Utility untuk mengganti custom CSS classes dengan MUI sx props
 * Mengikuti best practices dari dokumentasi MUI terbaru
 */
import type { SxProps, Theme } from '@mui/material';

/**
 * Text styling utilities yang mengganti custom CSS classes
 */
export const textStyles = {
  // Font weights
  bold: { fontWeight: 700 } as SxProps<Theme>,
  semiBold: { fontWeight: 600 } as SxProps<Theme>,
  normal: { fontWeight: 400 } as SxProps<Theme>,

  // Text alignment
  center: { textAlign: 'center' } as SxProps<Theme>,
  left: { textAlign: 'left' } as SxProps<Theme>,
  right: { textAlign: 'right' } as SxProps<Theme>,

  // Colors
  primary: { color: 'primary.main' } as SxProps<Theme>,
  primaryDark: { color: 'primary.dark' } as SxProps<Theme>,
  secondary: { color: 'secondary.main' } as SxProps<Theme>,
  success: { color: 'success.main' } as SxProps<Theme>,
  error: { color: 'error.main' } as SxProps<Theme>,
  warning: { color: 'warning.main' } as SxProps<Theme>,
  info: { color: 'info.main' } as SxProps<Theme>,
  textPrimary: { color: 'text.primary' } as SxProps<Theme>,
  textSecondary: { color: 'text.secondary' } as SxProps<Theme>,
  grey: { color: 'grey.500' } as SxProps<Theme>,
  blur: { color: 'grey.400' } as SxProps<Theme>,

  // Cursor
  pointer: { cursor: 'pointer' } as SxProps<Theme>,
  text: { cursor: 'text' } as SxProps<Theme>,

  // Hover effects
  link: {
    cursor: 'pointer',
    '&:hover': {
      color: 'primary.main'
    }
  } as SxProps<Theme>,

  // Highlight text
  highlight: {
    backgroundColor: 'primary.50',
    color: 'primary.main',
    px: 0.5,
    py: 0.25,
    borderRadius: 1
  } as SxProps<Theme>
};

/**
 * Form styling utilities
 */
export const formStyles = {
  // Error field styling
  errorField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'error.main'
      },
      '&:hover fieldset': {
        borderColor: 'error.main'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'error.main'
      }
    },
    '& .MuiInputLabel-root': {
      color: 'error.main'
    }
  } as SxProps<Theme>,

  // Error message styling
  errorMessage: {
    color: 'error.main',
    fontSize: '12px',
    mt: 0.5,
    display: 'block'
  } as SxProps<Theme>,

  // Label styling
  label: {
    fontWeight: 600,
    mb: 1,
    color: 'text.primary'
  } as SxProps<Theme>
};

/**
 * Container and layout utilities
 */
export const layoutStyles = {
  // Flex utilities
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  } as SxProps<Theme>,

  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  } as SxProps<Theme>,

  // Hover effects for containers
  hoverCard: {
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: 2
    }
  } as SxProps<Theme>,

  // Scroll utilities
  noScroll: {
    userSelect: 'none',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none'
  } as SxProps<Theme>,

  noClick: {
    pointerEvents: 'none'
  } as SxProps<Theme>
};

/**
 * Button styling utilities
 */
export const buttonStyles = {
  // Custom button variants
  primaryGradient: {
    background: 'linear-gradient(45deg, primary.main 30%, primary.light 90%)',
    color: 'primary.contrastText',
    '&:hover': {
      background: 'linear-gradient(45deg, primary.dark 30%, primary.main 90%)'
    }
  } as SxProps<Theme>,

  // Icon button styles
  iconButton: {
    borderRadius: 2,
    p: 1,
    '&:hover': {
      backgroundColor: 'action.hover'
    }
  } as SxProps<Theme>
};

/**
 * Status dan badge styling
 */
export const statusStyles = {
  success: {
    backgroundColor: 'success.light',
    color: 'success.dark',
    px: 2,
    py: 0.5,
    borderRadius: 1,
    fontSize: '12px',
    fontWeight: 600
  } as SxProps<Theme>,

  error: {
    backgroundColor: 'error.light',
    color: 'error.dark',
    px: 2,
    py: 0.5,
    borderRadius: 1,
    fontSize: '12px',
    fontWeight: 600
  } as SxProps<Theme>,

  warning: {
    backgroundColor: 'warning.light',
    color: 'warning.dark',
    px: 2,
    py: 0.5,
    borderRadius: 1,
    fontSize: '12px',
    fontWeight: 600
  } as SxProps<Theme>,

  info: {
    backgroundColor: 'info.light',
    color: 'info.dark',
    px: 2,
    py: 0.5,
    borderRadius: 1,
    fontSize: '12px',
    fontWeight: 600
  } as SxProps<Theme>
};

/**
 * Utility function untuk combine multiple sx styles
 */
export const combineSx = (...styles: Array<SxProps<Theme> | undefined>): SxProps<Theme> => {
  return styles
    .filter((style): style is SxProps<Theme> => Boolean(style))
    .reduce<SxProps<Theme>>((acc: any, style) => {
      if (!acc) return style;
      if (!style) return acc;

      if (typeof style === 'function') {
        return (theme: Theme) =>
          ({
            ...(typeof acc === 'function' ? acc(theme) : acc),
            ...style(theme)
          }) as SxProps<Theme>;
      }

      if (typeof acc === 'function') {
        return (theme: Theme) =>
          ({
            ...acc(theme),
            ...style
          }) as SxProps<Theme>;
      }

      return { ...acc, ...style } as SxProps<Theme>;
    }, {} as SxProps<Theme>);
};
