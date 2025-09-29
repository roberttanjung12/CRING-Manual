import type { ReactNode } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from '@/store/hooks';
import { toggleMobileSidebar } from '@/store/slice/appearance';

/**
 * Renders a toggle menu button for the main header.
 *
 * This component displays an icon button with a menu icon,
 * typically used to open a navigation drawer or sidebar.
 *
 * @returns {Readonly<ReactNode>} The rendered toggle menu button component.
 */
const MainHeaderToggleMenu = (): Readonly<ReactNode> => {
  const dispatch = useDispatch();

  return (
    <IconButton
      aria-label="open drawer"
      className="menu-btn"
      color="inherit"
      edge="start"
      size="large"
      sx={{ color: 'text.secondary' }}
      onClick={() => dispatch(toggleMobileSidebar())}
    >
      <MenuIcon sx={{ width: 35, height: 35 }} />
    </IconButton>
  );
};

export default MainHeaderToggleMenu;
