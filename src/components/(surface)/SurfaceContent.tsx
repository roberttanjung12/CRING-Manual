import { type ReactNode } from 'react';
import { Box } from '@mui/material';
import type { Theme } from '@mui/material/styles';

interface Props {
  isLast: boolean;
  label: string;
  content: string | ReactNode;
}

/**
 * A surface that's designed for showing label and content.
 *
 * @returns {React.JSX}
 */
const SurfaceContent = ({ isLast, label, content }: Props): Readonly<ReactNode> => {
  return (
    <Box
      data-testid="SurfaceContent"
      display="flex"
      flexWrap="nowrap"
      py={4}
      borderBottom={1}
      borderColor={(theme: Theme) => (!isLast ? theme.palette.grey[600] : 'transparent')}
    >
      <Box width="50%" color={(theme: Theme) => theme.palette.grey[600]}>
        {label}
      </Box>
      <Box width="50%" fontWeight={600}>
        {content}
      </Box>
    </Box>
  );
};

export default SurfaceContent;
