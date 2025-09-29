'use client';

import { useMemo } from 'react';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MainScrollbar } from '@/@dront/components';
import { useSelector, useDispatch } from '@/store/hooks';
import { hoverSidebar, toggleMobileSidebar } from '@/store/slice/appearance';
import type { ApplicationState } from '@/store/store';
import SidebarNavigation from './Navigation';
import SidebarLogo from './SidebarLogo';
import SidebarToggle from './SidebarToggle';

const SidebarContent = () => (
  <Box
    id="logo--navigations"
    position="relative"
    height="100%"
    sx={{
      backgroundImage: 'url(/background/sidebar.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '300px auto',
      backgroundPosition: 'left bottom'
    }}
  >
    <SidebarLogo />
    <SidebarToggle />
    <MainScrollbar sx={{ height: 'calc(100% - 130px)', pb: 5, overflowX: 'hidden' }}>
      <SidebarNavigation />
    </MainScrollbar>
  </Box>
);

const MainSidebar = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));

  const { isCollapse, isMobile, isHover } = useSelector((state: ApplicationState) => state.appearance.sidebar);

  const dispatch = useDispatch();

  const theme = useTheme();

  const toggleWidth = useMemo<number>(() => (isCollapse && !isHover ? 76 : 300), [isCollapse, isHover]);

  const onHover = (isEntering: boolean) => {
    if (isCollapse) {
      dispatch(hoverSidebar(isEntering));
    }
  };

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isMobile}
        onClose={() => dispatch(toggleMobileSidebar())}
        variant="temporary"
        slotProps={{
          paper: {
            sx: {
              width: 300,
              background: ({ palette }) => palette.primary.dark
            }
          }
        }}
      >
        <SidebarContent />
      </Drawer>
    );
  }

  return (
    <Box zIndex={100} width={toggleWidth} flexShrink={0} sx={{ ...(isCollapse && { position: 'absolute' }) }}>
      <Drawer
        anchor="left"
        open
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        variant="permanent"
        slotProps={{
          paper: {
            sx: {
              transition: theme.transitions.create('width', { duration: theme.transitions.duration.shortest }),
              width: toggleWidth,
              boxSizing: 'border-box',
              background: ({ palette }) => palette.primary.dark
            }
          }
        }}
      >
        <SidebarContent />
      </Drawer>
    </Box>
  );
};

export default MainSidebar;
