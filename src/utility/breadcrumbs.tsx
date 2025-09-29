import type { ReactNode } from 'react';
import HomeIcon from '@mui/icons-material/Home';

interface Type {
  label: string | ReactNode;
  url: string;
}

const setBreadcrumb = (list: Array<Type>): Array<Type> => {
  const set: Array<Type> = [
    {
      label: (
        <span title="Beranda">
          <HomeIcon />
        </span>
      ),
      url: '/'
    },
    ...list.filter(({ label, url }) => typeof label === 'string' && url !== '/')
  ];

  return set.length > 1 ? set : [];
};

export default setBreadcrumb;
