'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Collapse, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useSelector } from '@/store/hooks';
import type { NavigationProps } from './navigation-types';
import NavigationWrapper from './NavigationWrapper';

const NavigationItem = ({ isFirst, title, icon, href, sub, isNewTab = false }: NavigationProps) => {
  const pathname = usePathname();

  const { borderRadius, sidebar } = useSelector(state => state.appearance);

  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = useMemo(() => Boolean(sub.length), [sub.length]);

  const isSelected = useMemo(() => (href && pathname.startsWith(href)) || isOpen, [href, isOpen, pathname]);

  return (
    <ListItem sx={{ display: 'block', m: 0, p: 0 }}>
      <NavigationWrapper hasChildren={hasChildren} href={href} isNewTab={isNewTab}>
        <ListItemButton
          selected={isSelected}
          sx={{
            py: 3,
            px: 3.5,
            borderRadius: `${borderRadius}px`,
            fontSize: 16,
            color: ({ palette }) => palette.common.white,
            fontWeight: 600,
            textDecoration: 'none',
            '&:hover, &.Mui-selected': {
              color: ({ palette }) => palette.common.white,
              backgroundColor: 'rgba(255, 255, 255, 0.4)'
            }
          }}
          onClick={() => hasChildren && setIsOpen(prev => !prev)}
        >
          {isFirst && (
            <ListItemIcon sx={{ minWidth: 24 }}>
              <Icon
                sx={{
                  color: ({ palette }) => palette.common.white
                }}
              >
                {icon}
              </Icon>
            </ListItemIcon>
          )}
          <Box minWidth={18} />
          <ListItemText title={title} disableTypography sx={{ my: 0, overflow: 'hidden', whiteSpace: 'pre' }}>
            {title}
          </ListItemText>
          {hasChildren && <>{isOpen ? <ExpandLess /> : <ExpandMore />}</>}
        </ListItemButton>
        {hasChildren && (
          <Collapse
            in={isOpen && sidebar.isHover}
            timeout="auto"
            unmountOnExit
            sx={{
              mt: 2,
              '& .MuiCollapse-wrapper': {
                pl: 10,
                backgroundColor: 'transparent',
                '.MuiListItem-root': { m: 0, p: 0 }
              }
            }}
          >
            <List sx={{ pt: 0 }}>
              {sub.map(item => (
                <NavigationItem
                  key={item.id}
                  isFirst={false}
                  isNewTab={item.isNewTab}
                  id={item.id}
                  title={item.title}
                  icon={item.icon}
                  href={item.href}
                  sub={item.sub}
                />
              ))}
            </List>
          </Collapse>
        )}
      </NavigationWrapper>
    </ListItem>
  );
};

export default NavigationItem;
