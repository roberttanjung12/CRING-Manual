import { Box } from '@mui/material';
import { node, number } from 'prop-types';

/**
 * A custom tab panel component that conditionally renders its children based on the active tab.
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content to be displayed in the tab panel
 * @param {number} props.value - The currently active tab value
 * @param {number} props.index - The index/identifier of this tab panel
 * @param {Object} [props.other] - Additional props to be spread to the root div element
 *
 * @returns {React.JSX} A div element that serves as a tab panel with proper ARIA attributes
 */
const CustomTabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div
      aria-labelledby={`simple-tab-${index}`}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: node,
  index: number.isRequired,
  value: number.isRequired
};

export default CustomTabPanel;
