import { type ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
  /**
   * The label text displayed above the field
   */
  label: string;
  /**
   * The content displayed within the field
   */
  children: ReactNode;
  /**
   * Whether the field is required
   */
  required?: boolean;
}

/**
 * A wrapper component that provides consistent styling and layout for form fields.
 *
 * @returns {React.JSX} A readonly React node containing the labeled field wrapper
 *
 * @example
 * ```tsx
 * <WrapperField label="Email Address" required>
 *   <TextField type="email" />
 * </WrapperField>
 * ```
 */
const WrapperField = ({ label, required, children }: Props): Readonly<ReactNode> => {
  return (
    <Box data-testid="WrapperField">
      <Typography component="label" fontWeight={600} sx={{ color: ({ palette }) => palette.grey.A200 }}>
        {label}{' '}
        {required && (
          <Typography component="span" color="error.main">
            *
          </Typography>
        )}
      </Typography>
      <Box mt={2}>
        <>{children}</>
      </Box>
    </Box>
  );
};

export default WrapperField;
