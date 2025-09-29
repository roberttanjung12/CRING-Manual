import type { ReactNode } from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';

interface Props {
  /**
   * Main content.
   * @type {React.JSX}
   */
  children: Readonly<ReactNode>;
}

/**
 * A layout that's designed for showing blank layout.
 *
 * @returns {React.JSX}
 */
const BlankLayout = ({ children }: Props): Readonly<ReactNode> => {
  return (
    <Box bgcolor={({ palette }: any) => palette.background.default}>
      <Box
        component="header"
        display="flex"
        alignItems="center"
        position="fixed"
        top={0}
        left={0}
        zIndex={10}
        height={76}
        width="100%"
        bgcolor={({ palette }: any) => palette.background.paper}
        boxShadow="2px 4px 4px 0px #0000001A"
      >
        <Box width="100%" px={{ xs: '15px', lg: '120px' }}>
          <Box display="flex" alignItems="center">
            <Box component="a" display="block" height={36}>
              <Image
                priority
                alt="CRING!"
                src="/logo-2/CRING-LOGO-COLOR.png"
                height={612}
                width={2325}
                style={{ height: '100%', width: 'auto' }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" overflow="auto" pt="76px">
        <>{children}</>
      </Box>
    </Box>
  );
};

export default BlankLayout;
