'use client';

import { type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import type { TableCRINGActionProps } from './typeAction';

interface Props extends TableCRINGActionProps {
  data: Record<string, any>;
}

const TableCRINGActionItem = ({ data, label, icon: Icon, href, onClick }: Props): Readonly<ReactNode> => {
  const { push } = useRouter();

  const onAction = async () => {
    if (typeof onClick === 'function') {
      await onClick(data);

      return;
    }

    if (typeof href === 'function') push(href(data));
  };

  return (
    <MenuItem onClick={onAction}>
      {Icon && (
        <ListItemIcon>
          <Icon fontSize="inherit" />
        </ListItemIcon>
      )}
      <ListItemText>{label}</ListItemText>
    </MenuItem>
  );
};

export default TableCRINGActionItem;
