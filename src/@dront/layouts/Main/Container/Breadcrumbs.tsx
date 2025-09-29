import Link from 'next/link';
import { uniqueId } from 'lodash';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import type { BreadcrumbsInterface } from '@/@dront/components/PageID/page-id-types';

const ContainerBreadcrumbs = ({ title, routes }: BreadcrumbsInterface) => {
  return (
    <Box data-testid="ContainerBreadcrumbs">
      <Typography component="h1" variant="h1" fontSize={23} fontWeight={800}>
        {title}
      </Typography>
      {Array.isArray(routes) && routes.length ? (
        <Breadcrumbs
          aria-label="breadcrumbs"
          sx={{
            width: '100%',
            '.MuiBreadcrumbs-separator': {
              mx: 1
            }
          }}
        >
          <Link key={uniqueId()} title="Per ke Beranda" href="/" style={{ textDecoration: 'none' }}>
            <Typography fontWeight={500} sx={{ color: ({ palette }) => palette.grey[700] }}>
              <HomeIcon fontSize="inherit" />
            </Typography>
          </Link>
          {routes.map(route => (
            <Link
              key={uniqueId()}
              href={route.href ?? '#'}
              title={`Pergi ke ${route.label}`}
              style={{ textDecoration: 'none' }}
            >
              <Typography fontSize={12} fontWeight={500} sx={{ color: ({ palette }) => palette.grey[700] }}>
                {route.label}
              </Typography>
            </Link>
          ))}
        </Breadcrumbs>
      ) : undefined}
    </Box>
  );
};

export default ContainerBreadcrumbs;
