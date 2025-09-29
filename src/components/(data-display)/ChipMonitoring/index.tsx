import type { ReactNode } from 'react';
import { Chip, Tooltip } from '@mui/material';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

interface Props {
  /**
   * List of category.
   * @type {string}
   */
  category: string;
  /**
   * Title of tooltip.
   * @type {string}
   */
  title: string;
  /**
   * Status of visibility.
   * @type {boolean}
   * @default true
   */
  isOpen?: boolean;
}

/**
 * A data display that's designed for showing Chip of Monitoring.
 *
 * @returns {React.JSX}
 */
const ChipMonitoring = ({ category, title, isOpen = true }: Props): Readonly<ReactNode> => {
  return (
    isOpen && (
      <Tooltip data-testid="ChipMonitoring" title={title} placement="top-start">
        <Chip
          icon={<ReportGmailerrorredIcon fontSize="inherit" />}
          label={category}
          color="warning"
          size="small"
          className="--no-click --no-scroll"
          sx={{ cursor: 'text' }}
        />
      </Tooltip>
    )
  );
};

export default ChipMonitoring;
