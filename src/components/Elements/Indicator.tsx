import { type ReactNode, useMemo } from 'react';
import { Box } from '@mui/material';

/**
 * A component that's designed for show indicator
 *
 * @param {Object} props list of prop
 * @param {React.JSX} props.children main content
 * @param {'primary' | 'secondary' | 'success' | 'warning' | 'danger'} props.color type of color
 *
 * @returns {React.JSX} ui
 */
const Indicator = ({
  children,
  color = 'secondary'
}: {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}): Readonly<ReactNode> => {
  const setColor = useMemo(() => {
    const colorList = [{ color: 'secondary', hex: '#C62525' }];

    let set = '';

    const getColor = colorList.find(find => find.color === color);

    if (getColor?.hex) set = getColor.hex;

    return set;
  }, [color]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
      <Box sx={{ height: 11, width: 11, backgroundColor: setColor, borderRadius: 100 }} />
      <Box sx={{ pl: 2, color: ({ palette }) => palette.grey[100] }}>{children}</Box>
    </Box>
  );
};

export default Indicator;
