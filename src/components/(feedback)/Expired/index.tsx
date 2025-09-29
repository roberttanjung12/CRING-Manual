import type { ReactNode } from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import ExpiredButtonRedirect from './ButtonRedirect';

/**
 * Expired Component
 *
 * Renders a message indicating that a link has expired.
 * The component displays:
 * - A "Fail" icon from the public assets
 * - A header message stating the link has expired
 * - A secondary message instructing the user to contact an admin
 *
 * All content is centered and includes a data-testid for testing.
 *
 * @returns {React.JSX} The expired notification UI
 */
const Expired = (): Readonly<ReactNode> => {
  return (
    <Box data-testid="expired" textAlign="center">
      <Box width={100} mx="auto">
        <Image
          priority
          alt="Fail"
          src="/icon/progress-fail.svg"
          height={512}
          width={512}
          style={{ height: 'auto', width: '100%' }}
        />
      </Box>
      <Typography mt={4} fontSize={18} fontWeight={700}>
        Tautan sudah kadaluarsa.
      </Typography>
      <Typography variant="body2" mt={2} mb={4} fontSize={16} color="text.secondary">
        Silahkan hubungi admin untuk mendapatkan link terbaru.
      </Typography>
      <ExpiredButtonRedirect />
    </Box>
  );
};

export default Expired;
