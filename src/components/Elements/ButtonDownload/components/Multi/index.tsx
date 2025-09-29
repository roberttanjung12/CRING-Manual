import { useState, useEffect, type ReactNode } from 'react';
import { Box, Button, type ButtonProps, List, ClickAwayListener } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import isEmpty from 'is-empty';
import ButtonDownloadMultiItem from './components/Item';

interface ItemReminderChild {
  textButtonCancel: string;
  textButtonSave: string;
  title: string;
  desc: string | ReactNode;
}

interface Item {
  label: string;
  onDownload: () => Promise<void>;
  isReminder?: boolean;
  reminder?: ItemReminderChild;
}

interface Props {
  id: string;
  isHideIcon: boolean;
  variant: ButtonProps['variant'];
  color: ButtonProps['color'];
  disabled: boolean;
  isOnlyIcon: boolean;
  size: ButtonProps['size'];
  label: string;
  items: Item[];
  sx: ButtonProps['sx'];
}

const isNoMinWidth = (isOnlyIcon: boolean) => {
  if (isOnlyIcon) return '--no--min-width';

  return '';
};

const ButtonDownloadMulti = ({
  id,
  isHideIcon,
  variant,
  color,
  disabled,
  isOnlyIcon,
  size,
  label,
  items,
  sx
}: Props): Readonly<ReactNode> => {
  // group: state
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);

  return (
    <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={() => setIsOpen(false)}>
      <Box id={`${id}:plural`} position="relative">
        <Button
          className={isNoMinWidth(isOnlyIcon)}
          color={color}
          data-testid={`${id}:plural:button`}
          disabled={disabled}
          id={`${id}:plural:button`}
          size={size}
          sx={sx}
          variant={variant}
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isHideIcon && <DownloadIcon sx={{ marginRight: isOnlyIcon ? '0' : '10px' }} />} {!isOnlyIcon && label}{' '}
          {!isEmpty(items) && !isOnlyIcon && <ExpandMoreIcon sx={{ marginLeft: '10px' }} />}
        </Button>
        {isOpen && (
          <Box
            sx={{
              position: 'absolute',
              top: '100',
              left: '0',
              width: '100%',
              minWidth: '125px',
              zIndex: '10',
              background: ({ palette }) => palette.background.default,
              boxShadow: '0 0 10px #e7e7e7'
            }}
          >
            <List>
              {items.map((item, itemIndex) => (
                <ButtonDownloadMultiItem key={item.label} data={item} id={id} index={itemIndex} onSuccess={setIsOpen} />
              ))}
            </List>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default ButtonDownloadMulti;
