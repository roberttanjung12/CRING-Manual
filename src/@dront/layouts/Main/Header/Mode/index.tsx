import { IconButton, Tooltip } from '@mui/material';
import {
  DarkModeOutlined as DarkModeOutlinedIcon,
  LightModeOutlined as LightModeOutlinedIcon
} from '@mui/icons-material';
import { useSelector, useDispatch } from '@/store/hooks';
import { setAppearance } from '@/store/slice/appearance';
import type { ApplicationState } from '@/store/store';

const Mode = () => {
  const { activeMode } = useSelector((state: ApplicationState) => state.appearance);

  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setAppearance('activeMode', activeMode === 'light' ? 'dark' : 'light'));
  };

  const Icon = activeMode === 'light' ? DarkModeOutlinedIcon : LightModeOutlinedIcon;
  const tooltipTitle = activeMode === 'light' ? 'Dark Mode' : 'Light Mode';

  return (
    <IconButton size="large" color="inherit" onClick={onClick}>
      <Tooltip title={tooltipTitle} arrow>
        <Icon />
      </Tooltip>
    </IconButton>
  );
};

export default Mode;
