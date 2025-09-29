'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box } from '@mui/material';

const SidebarLogo = () => {
  const [newWidth, setNewWidth] = useState(162);

  const onResize = useCallback((entries: any) => {
    for (const entry of entries) {
      const { width } = entry.target.getBoundingClientRect();
      const result = (width / 291) * 162;

      setNewWidth(result);
    }
  }, []);

  useEffect(() => {
    const getSidebar = document.getElementById('logo--navigations');

    if (getSidebar) {
      new ResizeObserver(onResize).observe(getSidebar);

      return () => {
        new ResizeObserver(onResize).unobserve(getSidebar);
      };
    }
  }, [onResize]);

  return (
    <Box date-testid="SidebarLogo" py={4} display="flex" alignItems="center" justifyContent="center">
      <Box sx={{ width: newWidth, minWidth: 42.5, overflow: 'hidden' }}>
        <Link as="/" href="/">
          <Box height={42.5} width={162}>
            <Image
              priority
              alt="CRING!"
              src="/logo-2/CRING-LOGO-WHITE.png"
              height={67}
              width={256}
              style={{ height: 'auto', width: 'auto', maxHeight: '100%' }}
            />
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default SidebarLogo;
