'use client';

import { IconButton, useMediaQuery } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useSelector, useDispatch } from '@/store/hooks';
import { toggleSidebar } from '@/store/slice/appearance';
import type { ApplicationState } from '@/store/store';

const SidebarToggle = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

  const { isCollapse, isHover } = useSelector((state: ApplicationState) => state.appearance.sidebar);

  const dispatch = useDispatch();

  return (
    lgUp && (
      <IconButton
        id="sidebar-minimize"
        aria-label="Sidebar minimize"
        color="primary"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 60,
          left: !isHover ? 63 : 287,
          zIndex: 10,
          minWidth: 0,
          height: 26,
          width: 26,
          p: 0,
          transition: 'all 0.15s ease-in-out',
          backgroundColor: ({ palette }) => palette.background.paper,
          border: ({ palette }) => `1px solid ${palette.primary.main}`,
          borderRadius: '5px',
          color: ({ palette }) => palette.primary.main
        }}
        onClick={() => dispatch(toggleSidebar())}
      >
        <ChevronLeftIcon
          sx={{
            transition: 'all 0.15s ease-in-out',
            transform: `rotate(${!isCollapse ? 0 : 180}deg)`
          }}
        />
      </IconButton>
    )
  );
};

export default SidebarToggle;
