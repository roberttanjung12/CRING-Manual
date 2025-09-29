'use client';

import { type ReactNode, useState } from 'react';
import { IconButton, Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TableCRINGActionItem from './ActionItem';
import type { TableCRINGPropAction } from './type';

interface Props extends TableCRINGPropAction {
  data: Record<string, any>;
}

const TableCRINGAction = ({ actions, data }: Props): Readonly<ReactNode> => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorElement(event.currentTarget);

  const handleClose = () => setAnchorElement(null);

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorElement}
        onClose={handleClose}
        open={Boolean(anchorElement)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ borderRadius: 3 }}
      >
        {actions?.map(action => (
          <TableCRINGActionItem
            key={action.label}
            data={data}
            label={action.label}
            icon={action.icon}
            href={action.href}
            onClick={action.onClick}
          />
        ))}
      </Menu>
    </>
  );
};

export default TableCRINGAction;
