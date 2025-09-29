import { Box, List } from '@mui/material';
import menus from '@/data/menus';
import NavigationItem from './NavigationItem';

const SidebarNavigation = () => {
  return (
    <Box px={3}>
      <List sx={{ pt: 0 }}>
        {menus.map(item => (
          <NavigationItem
            key={item.id}
            isFirst
            isNewTab={item.isNewTab}
            id={item.id}
            title={item.title}
            icon={item.icon}
            href={item.href}
            sub={item.sub}
          />
        ))}
      </List>
    </Box>
  );
};

export default SidebarNavigation;
