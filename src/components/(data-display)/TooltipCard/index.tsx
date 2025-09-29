import { useState, type ReactNode } from 'react';
import { Box, ClickAwayListener, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import type { TooltipCardProps } from './type';

/**
 * A component that's designed for show tooltip card.
 *
 * @returns {React.JSX}
 */
const TooltipCard = ({ isOpen = true, title, children, tooltip, icon }: TooltipCardProps): Readonly<ReactNode> => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [openTooltip, setOpenTooltip] = useState(false);

  const handleToggleTooltip = () => {
    if (isMobile) {
      setOpenTooltip(prev => !prev);
    }
  };

  const handleCloseTooltip = () => {
    if (isMobile) {
      setOpenTooltip(false);
    }
  };

  return (
    <Box data-testid="TooltipCard" position="relative">
      <Box
        position="absolute"
        top={tooltip?.top ?? 10}
        right={tooltip?.right ?? 10}
        bottom={tooltip?.bottom}
        left={tooltip?.left}
        zIndex={tooltip?.zIndex ?? 1}
      >
        <ClickAwayListener onClickAway={handleCloseTooltip}>
          <Box onClick={handleToggleTooltip}>
            {isOpen && (
              <Tooltip
                title={title}
                placement={tooltip?.placement}
                open={isMobile ? openTooltip : undefined}
                disableHoverListener={isMobile}
                disableFocusListener={isMobile}
                disableTouchListener={isMobile}
              >
                <Box>
                  {icon?.icon ? (
                    icon?.icon
                  ) : (
                    <InfoOutlinedIcon
                      fontSize={icon?.fontSize ?? 'small'}
                      sx={{ color: ({ palette }) => icon?.color ?? palette.grey[400] }}
                    />
                  )}
                </Box>
              </Tooltip>
            )}
          </Box>
        </ClickAwayListener>
      </Box>
      <>{children}</>
    </Box>
  );
};

export default TooltipCard;
