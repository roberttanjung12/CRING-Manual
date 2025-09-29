import { useState, useEffect, type ReactNode } from 'react';
import { Box, Button, type ButtonProps } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import DownloadIcon from '@mui/icons-material/Download';
import ButtonDownloadConfirmation from './Confirmation';

interface ItemRemiderChild {
  textButtonCancel: string;
  textButtonSave: string;
  title: string;
  desc: string | ReactNode;
}

interface Item {
  label: string;
  onDownload: () => Promise<void>;
  reminder?: ItemRemiderChild;
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
  item: Item;
  sx: ButtonProps['sx'];
}

const isNoMinWidth = (isOnlyIcon: boolean) => {
  if (isOnlyIcon) return '--no--min-width';

  return '';
};

const ButtonDownloadSingle = ({
  id,
  isHideIcon,
  variant,
  color,
  disabled,
  isOnlyIcon,
  size,
  label,
  item,
  sx
}: Props): Readonly<ReactNode> => {
  // group: state
  const [isSend, setIsSend] = useState(false);
  const [isShow, setIsShow] = useState(false);

  // group: action
  const onDownload = async (cb: () => Promise<void>) => {
    setIsShow(false);
    setIsSend(true);
    await cb();
    setIsSend(false);
  };

  const onClick = (cb: () => Promise<void>) => {
    if (!item?.reminder?.title) onDownload(cb);
    else setIsShow(true);
  };

  // group: mount
  useEffect(() => {
    return () => {
      setIsSend(false);
      setIsShow(false);
    };
  }, []);

  return (
    <Box id={`${id}:single`} position="relative">
      <Button
        className={isNoMinWidth(isOnlyIcon)}
        color={color}
        data-testid={`${id}:single:button`}
        disabled={disabled}
        id={`${id}:single:button`}
        size={size}
        sx={sx}
        variant={variant}
        onClick={() => onClick(item.onDownload)}
      >
        {isSend && <CircularProgress color="primary" size="14px" />}
        {!isHideIcon && !isSend && <DownloadIcon sx={{ marginRight: isOnlyIcon ? '0' : '10px' }} />}
        {!isOnlyIcon && label}
      </Button>
      {item?.reminder?.title && (
        <ButtonDownloadConfirmation
          data={item.reminder}
          isShow={isShow}
          onCancel={() => setIsShow(false)}
          onSave={() => onDownload(item.onDownload)}
        />
      )}
    </Box>
  );
};

export default ButtonDownloadSingle;
