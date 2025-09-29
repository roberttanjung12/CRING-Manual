import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { oneOfType, node, string } from 'prop-types';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} role="tooltip" />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 250,
    padding: '5px 10px',
    backgroundColor: '#F1F1F1',
    fontSize: '10px',
    color: '#747070',
    boxShadow: '2px 4px 4px 0px #0000001A',
    borderRadius: '8px'
  }
}));

const DataDisplayTooltip = ({ children, title, placement }) => {
  return (
    <HtmlTooltip placement={placement} sx={{ maxWidth: '150px', borderRadius: '8px' }} title={title}>
      {children}
    </HtmlTooltip>
  );
};

DataDisplayTooltip.propTypes = {
  children: oneOfType([node, string]),
  title: oneOfType([node, string]),
  placement: string
};

export default DataDisplayTooltip;
