import type { ReactNode } from 'react';
import { AppBar, Box, Stack, Toolbar, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchPageAdvanced from '@/components/SearchPage/advanced';
import { useMainLayout } from '@/context/MainLayoutProvider';
import menus from '@/data/menus';
import MainHeaderToggleMenu from './ToogleMenu';
import ContainerBreadcrumbs from '../Container/Breadcrumbs';

/**
 * MainHeader component renders the main application header bar.
 *
 * It uses Material-UI's AppBar and Toolbar components with custom styling.
 * The header includes a search page selector, mode switcher, notifications, and user profile section.
 * The menu items are retrieved from the authentication provider context.
 *
 * @component
 * @returns {React.JSX} The rendered main header component.
 */
const MainHeader = (): Readonly<ReactNode> => {
  const { breadcrumbs } = useMainLayout();

  const isLgUp = useMediaQuery(theme => theme.breakpoints.up('md'));

  const isLgDown = useMediaQuery(theme => theme.breakpoints.down('md'));

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    paddingRight: 8,
    paddingLeft: 8,
    background: theme.palette.background.default,
    boxShadow: 'unset'
  }));

  const ToolbarStyled = styled(Toolbar)(() => ({
    columnGap: 4,
    width: '100%',
    height: 76,
    color: 'black'
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {isLgDown && <MainHeaderToggleMenu />}
        {isLgUp && <ContainerBreadcrumbs title={breadcrumbs?.title ?? ''} routes={breadcrumbs?.routes || []} />}
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center" columnGap={2}>
          {isLgUp && (
            <SearchPageAdvanced
              localName="CRING_PAGES"
              menu={menus}
              shape={{ title: 'title', path: 'href', target: 'target', children: 'sub' }}
            />
          )}
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default MainHeader;
