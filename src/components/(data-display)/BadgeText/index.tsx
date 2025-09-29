import { useMemo, type ReactNode } from 'react';
import { Badge, type BadgeProps, Typography, useTheme } from '@mui/material';

interface Props {
  /**
   * List of color.
   * @type {BadgeProps['color']}
   */
  color: BadgeProps['color'];
  /**
   * Label of text.
   * @type {string}
   */
  label?: string;
  /**
   * children of text.
   * @type {string}
   */
  children?: ReactNode;
  /**
   * Status of visibility.
   * @type {boolean}
   * @default true
   */
  isOpen?: boolean;
  /**
   * Status of color text.
   * @type {boolean}
   * @default true
   */
  isWithTextColor?: boolean;
}

/**
 * BadgeText component displays a Material-UI Badge with optional label and children text.
 *
 * @returns {React.jsx}
 *
 * @example
 * ```tsx
 * <BadgeText color="primary" label="Active" />
 * ```
 */
const BadgeText = ({ color, label, children, isOpen = true, isWithTextColor = true }: Props): Readonly<ReactNode> => {
  const { palette } = useTheme();

  const colors = useMemo<{ color: Props['color']; text: string }[]>(
    () => [
      { color: 'default', text: palette.grey[600] },
      { color: 'error', text: palette.secondary.dark },
      { color: 'info', text: palette.info.dark },
      { color: 'primary', text: palette.primary.dark },
      { color: 'secondary', text: palette.secondary.light },
      { color: 'success', text: palette.success.dark },
      { color: 'warning', text: palette.warning.dark }
    ],
    [
      palette.grey,
      palette.info.dark,
      palette.primary.dark,
      palette.secondary.dark,
      palette.secondary.light,
      palette.success.dark,
      palette.warning.dark
    ]
  );

  const getTextColor = useMemo<string>(
    () => colors.find(item => item.color === color)?.text ?? palette.grey[100],
    [color, colors, palette.grey]
  );

  return (
    isOpen && (
      <Badge
        data-testid="BadgeText"
        color={color}
        variant="dot"
        className="cursor-text --no-scroll --no-click"
        sx={{ '.MuiBadge-dot': { top: '10px', right: 'auto', left: '0' } }}
      >
        {label && (
          <Typography pl={5} color={isWithTextColor ? getTextColor : ''}>
            {label}
          </Typography>
        )}
        {children && (
          <Typography component="div" pl={5} color={isWithTextColor ? getTextColor : ''}>
            {children}
          </Typography>
        )}
      </Badge>
    )
  );
};

export default BadgeText;
