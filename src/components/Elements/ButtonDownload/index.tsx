import { type ReactNode, useMemo } from 'react';
import type { ButtonProps } from '@mui/material';
import ButtonDownloadMulti from './components/Multi';
import ButtonDownloadSingle from './components/Single';

interface ItemReminderChild {
  textButtonCancel: string;
  textButtonSave: string;
  title: string;
  desc: string | ReactNode;
}

interface Item {
  label: string;
  onDownload: () => Promise<void>;
  isClose?: boolean;
  reminder?: ItemReminderChild;
}

interface Props {
  id?: string;
  isHideIcon?: boolean;
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
  disabled?: boolean;
  isOnlyIcon?: boolean;
  size?: ButtonProps['size'];
  label?: string;
  items?: Item[];
  sx?: ButtonProps['sx'];
}

/**
 * A component that's designed for showing download button
 *
 * @returns {React.JSX}
 */
const ButtonDownload = ({
  id = 'download:button',
  isHideIcon = false,
  variant = 'outlined',
  color = 'primary',
  disabled = false,
  isOnlyIcon = false,
  size = 'large',
  label = 'Download',
  items = [],
  sx = {}
}: Props) => {
  const newItems = useMemo<Array<Item>>(() => items.filter(item => !item.isClose), [items]);

  return (
    <div>
      {newItems.length <= 1 ? (
        <ButtonDownloadSingle
          color={color}
          disabled={disabled}
          id={id}
          isHideIcon={isHideIcon}
          isOnlyIcon={isOnlyIcon}
          item={newItems[0]}
          label={label}
          size={size}
          sx={sx}
          variant={variant}
        />
      ) : (
        <ButtonDownloadMulti
          color={color}
          disabled={disabled}
          id={id}
          isHideIcon={isHideIcon}
          isOnlyIcon={isOnlyIcon}
          items={newItems}
          label={label}
          size={size}
          sx={sx}
          variant={variant}
        />
      )}
    </div>
  );
};

export default ButtonDownload;
